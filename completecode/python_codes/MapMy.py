'''Import All required libraries'''
from __future__ import division
from __future__ import print_function
from ortools.constraint_solver import pywrapcp
from ortools.constraint_solver import routing_enums_pb2
from pymongo import MongoClient

import json
import requests
import urllib.request as ur

'''Declare global variales'''
data = {}
distance_list = []
time_list = []
data['API_key'] = '7k1d926vl88r4eyaxtg6ex2g64bvs35z'

'''distance matrix url'''
url = 'https://maps.googleapis.com/maps/api/distancematrix/json?'


'''Database connection setup'''
def database():
        print("aaaaaaaaaaaaaa")
        global mydatabase
        client = MongoClient('localhost', 27017)
        mydatabase = client['stationsystem']    #Database Name

'''Fetch required data from database'''
def create_data():
      print("bbbbbbbbbb")
      # Get the locations from the database
      locations, demands, lat, long, endlatitude, endlongitude, endLocation = [], [], [], [], [],[],[]
      for x in table1.find():
          for i in range(len(x['Noofpeople'])):
              data['latitude'] = x['pickupLatLng'][i]['lat']
              data['longitude'] = x['pickupLatLng'][i]['lng']
              data['demands'] = x['Noofpeople'][i]
              data['demands'] = int(data['demands'].replace("'", ""))
              lat.append(data['latitude'])
              long.append(data['longitude'])
              demands.append(data['demands'])
          endlatitude.append(x['EndLatLong'][0]['lat'])
          endlongitude.append(x['EndLatLong'][0]['lng'])
          endLocation.append(str(x['EndLatLong'][0]['lat']) + ',' + str(x['EndLatLong'][0]['lng']))
          demands.insert(len(demands), 0)  # Add zero people for end location
          data['latitude'] = lat
          data['longitude'] = long
          data['demands'] = demands
          # Add pickup lat,long and store in locations array
          for i in range(len(data['latitude'])):
              locations.append(str(lat[i]) + ',' + str(long[i]))

          vehicleNumber, startpoint, endpoint, startlat, startlong, vehiclecapacity, endlat, endlong = [], [], [], [], [], [],[],[]
          for y in table2.find():
              data['vehicleNumber'] = y['vechicleNumber']
              data['startlat'] = y['Latitude']
              data['startlong'] = y['Longitude']
              data['vehicle_capacities'] = y['vechiclecapacity']
              vehicleNumber.append(data['vehicleNumber'])
              startlat.append(data['startlat'])
              startlong.append(data['startlong'])
              vehiclecapacity.append(data['vehicle_capacities'])

          #Combine start lat,long and store in startpoint
          for j in range(len(vehicleNumber)):
              startpoint.append(str(startlat[j]) + ',' + str(startlong[j]))
          locations = startpoint + locations + endLocation

          '''Convert lat,long of start and end point to integers'''
          startdemand,data['starts'], data['ends'] = [], [],[]
          for i in range(len(startpoint)):
              for j in range(len(locations)):
                  if (locations[j] == startpoint[i]):
                      data['starts'].append(j)
                      startdemand.append(0)
                  if (locations[j] == endLocation[0]):
                      endpoint.append(endLocation[0])
                      data['ends'].append(j)
          data['latitude'] = startlat + data['latitude'] + endlatitude
          data['longitude'] = startlong + data['longitude'] + endlongitude
          data['demands'] = startdemand + demands
          data['addresses'] = locations
          data['demands'] = data['demands']
          data['vehicleNumber'] = vehicleNumber
          data['startlat'] = startlat
          data['startlong'] = startlong
          data['vehicle_capacities'] = vehiclecapacity
          data['endlat'] = endlat
          data['endlong'] = endlong

          print("Locations:", data['addresses'])
          print("Demands", data['demands'])
          print("vehiclenumber:", vehicleNumber)
          print("startpoint:", startpoint)
          print("startpoint", data['starts'])
          print("endpoint", endpoint)
          print("endpoint", data['ends'])
          print("vehiclecapacity", data['vehicle_capacities'])

          return data

'''Create Distance Matrix'''
def create_distance_matrix(data):
  print("cccccc")
  addresses = data['addresses']
  API_key = data["API_key"]
  # Distance Matrix API only accepts 100 elements per request, so get rows in multiple requests.
  max_elements = 100
  num_addresses = len(addresses)  # 16 in this example.
  # Maximum number of rows that can be computed per request (6 in this example).
  max_rows = max_elements // num_addresses
  # num_addresses = q * max_rows + r (q = 2 and r = 4 in this example).
  q, r = divmod(num_addresses, max_rows)
  dest_addresses = addresses
  distance_matrix = []
  # Send q requests, returning max_rows rows per request.
  for i in range(q):
      origin_addresses = addresses[i * max_rows: (i + 1) * max_rows]
      # print("original address:",origin_addresses)
      response = send_request(origin_addresses, dest_addresses, API_key)
      print("dest_addresses", response)
      # print("response:",response)
      distance_matrix += build_distance_matrix(response)

      # Get the remaining remaining r rows, if necessary.
  if r > 0:
      origin_addresses = addresses[q * max_rows: q * max_rows + r]
      response = send_request(origin_addresses, dest_addresses, API_key)
      distance_matrix += build_distance_matrix(response)
  return distance_matrix

'''Send request to the API to get distance matrix'''
def send_request(origin_addresses, dest_addresses, API_key):
  print("dddd")
  """ Build and send request for the given origin and destination addresses."""

  def build_address_str(addresses):
      print("eeeeeee")
      # Build a pipe-separated string of addresses
      address_str = ''
      for i in range(len(addresses) - 1):
          address_str += addresses[i] + '|'
      address_str += addresses[-1]
      return address_str

  try:
      request = 'https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial'
      print("Hello")
      
  except Exception:
      print("Unable to call API")
      exit()

########
# Main #
########
def main():
  print("ggggg")
  global distance_matrix
  """Entry point of the program"""
  '''Call Create data function to create distance matrix'''
  data = create_data()
  distance_matrix = create_distance_matrix(data)
  #print("Distance matrix: ",distance_matrix)

''' Start point of the program'''
if __name__ == '__main__':
    print("11111111")
    try:
        '''Call database function to connect with database'''
        database()
        table1 = mydatabase['trips']        #Trip table
        table2 = mydatabase['vehicles']     #Vehicle table
        main()
    except Exception:
        print("Error reading data from mongodb table")