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
data['API_key'] = 'AIzaSyC_ahW3YTAJC3BaRxW4Fa7QqFXwgB58bWc'

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
      origin_address_str = build_address_str(origin_addresses)
      print("origin_address_str",origin_address_str)
      dest_address_str = build_address_str(dest_addresses)
      print("dest_address_str:",dest_address_str)
      request = request + '&origins=' + origin_address_str + '&destinations=' + \
                dest_address_str + '&key=' + API_key
      jsonResult = ur.urlopen(request).read()
      response = json.loads(jsonResult)
      print("response", response)
      return response
  except Exception:
      print("Unable to call API")
      exit()


'''Get the distance matrix'''
def build_distance_matrix(response):
  print("fffffff")
  distance_matrix = []
  for row in response['rows']:
    row_list = [row['elements'][j]['distance']['value'] for j in range(len(row['elements']))]
    distance_matrix.append(row_list)
  return distance_matrix

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
  print("Distance matrix: ",distance_matrix)

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

def create_data_model():
    print("hhh")
    """Stores the data for the problem."""
    data['distance_matrix'] = distance_matrix
    print("data['distance_matrix']", data['distance_matrix'])
    data['demands'] = data['demands']
    print("Demands for each location:",data['demands'])
    data['vehicle_capacities'] = data['vehicle_capacities']
    print("Capacity of each vehicle:",data['vehicle_capacities'])
    data['starts'] = data['starts']
    print("Starting point of each vehicle:",data['starts'])
    data['ends'] = data['ends']
    print("End point of each vehicle:",data['ends'])
    print("data",data)
    return data


def print_solution(data, manager, routing, assignment):
    print("iiiiii")
    """Prints assignment on console."""
    total_distance = 0
    for vehicle_id in range(len(data['vehicle_capacities'])):
        index = routing.Start(vehicle_id)
        plan_output = 'Route for vehicle {}:\n'.format(data['vehicleNumber'][vehicle_id])
        route_distance = 0
        while not routing.IsEnd(index):
            node_index = manager.IndexToNode(index)
            plan_output += ' {0} -> '.format(node_index)
            previous_index = index
            index = assignment.Value(routing.NextVar(index))
            route_distance += routing.GetArcCostForVehicle(
                previous_index, index, vehicle_id)
        plan_output += ' {0}\n'.format(manager.IndexToNode(index))
        # print(plan_output)
        locations = data['addresses']
        route = [int(i) for i in plan_output.split() if i.isdigit()]
        print("route", route)

        '''Convert route in numbers to lat and long'''

        def route_latlng(route):
            print("jjjjjj")
            new = []
            for i in range(len(route)):
                route_map = route[i]
                new.append(locations[route_map])
            return new

        route = route_latlng(route)
        database()
        name_list = route
        '''Store Lat and Long seperately in database'''
        newLatLong_list = []
        routeaddress = []
        for i in name_list:
            sub_list = i.split(",")
            x = {"lat": sub_list[0], "lng": sub_list[1]}
            newLatLong_list.append(x)
            seplatlong = newLatLong_list
            print("hello",x['lat'])
            print("hiii",newLatLong_list[0])
            try:
                url = 'http://maptile.suveechi.com/nominatim/reverse.php?format=json&lat=' + str(
                    x['lat']) + '&lon=' + str(x['lng']) + '&zoom=18&addressdetails=0&email=map@suveechi.com'
                print('url=', url)
                response = requests.get(url)
                response_text = response.text
                if response_text != '' and len(response_text) > 100:
                    parsedJson = (json.loads(response.text))
                    routeaddress.append(parsedJson["display_name"])
                    print(parsedJson["display_name"])
            except Exception:
                print("Unable to call API")
        print("routeaddress", routeaddress)
        print("new_list", seplatlong)

        print("name_list", name_list)

        From_Location, To_Location = [], []

        '''Time for each locations of the route'''

        def timeforlocations():
            print("kkkkkk")
            for i in range(len(name_list) - 1):
                From_Location.append(name_list[i])
                To_Location.append(name_list[i + 1])
            return From_Location, To_Location

        timeforlocations()
        From_Location = From_Location
        To_Location = To_Location
        print("From_Location", From_Location)
        print("To_Location", To_Location)
        # distance matrix url
        url = 'https://maps.googleapis.com/maps/api/distancematrix/json?'

        '''Calculate the time and distance between the 2 locations'''

        def new_list():
            print("LLLLLL")
            try:
                for i in range(len(From_Location)):
                    if From_Location != To_Location:
                        response = requests.get(
                            url + 'origins=' + From_Location[i] + '&destinations=' + To_Location[
                                i] + '&key=' + data['API_key'])
                        # json response from api
                        json_response = response.json()
                        # print("json_response",json_response)
                        time = json_response['rows'][0]['elements'][0]['duration']['text']
                        distance = json_response['rows'][0]['elements'][0]['distance']['text']
                        # print(i)
                        # print("Distance",distance)
                        distance_list.append(distance)
                        '''Convert hour to minutes to get total time'''
                        if "hour" in time:
                            split = time.split()
                            hour = int(split[0]) * 60
                            min = int(split[2])
                            total_time = hour + min
                            total_time = str(total_time) + 'mins'
                            time_list.append(total_time)
                        else:
                            time_list.append(time)
                return distance_list, time_list
            except Exception:
                print("Unable to call api")
                exit()

        distance_list.clear()
        time_list.clear()
        new_list()
        print("distance_list", distance_list)
        print("time_list", time_list)
        total_time = []
        '''Calculate the total time'''
        def totalTime():
            for i in time_list:
                j = i.replace('mins','')
                total_time.append(int(j))
            return total_time
        totalTime()
        totlatimesum = sum(total_time)
        ttime = str(totlatimesum)+'mins'
        print("totaltime",ttime)
        plan_output = '{}'.format(route_distance)
        plan_output = int(plan_output) / (1000)
        plan_output = str(plan_output) + 'km'
        # print(plan_output)
        # collection = mydatabase.routes.insert_one({"vehicleNo":data['vehicleNumber'][vehicle_id],"routeforvehicle": seplatlong,"Distanceforeachlocation":distance_list, "Totaldistanceforroute":plan_output, "Timerequiredtotravelforeachlocation":time_list, "Total_Time":ttime})
        collection = mydatabase.routes.insert_one(
            {"vehicleNo": data['vehicleNumber'][vehicle_id], "routeforvehicle": seplatlong, "routeaddress":routeaddress,
             "Distanceforeachlocation": distance_list, "Totaldistanceforroute": plan_output,
             "Timerequiredtotravelforeachlocation": time_list, "Total_Time":ttime})
        # collection = mydatabase.routes.insert_one({"routeforvehicle": seplatlong,})
        print("Resultant route inserted successfully to mongodb", collection)

        # plan_output += 'Distance of the route: {}m\n'.format(route_distance)
        # print(plan_output)

        total_distance += route_distance
    # print('Total distance of all routes: {}m'.format(total_distance))
    # print('Total load of all routes: {}'.format(total_load))


'''Create optimum route for locations'''
def second_main():
    print("mmmmmm")
    """Solve the CVRP problem."""
    # Instantiate the data problem.
    data = create_data_model()
    # Create the routing index manager.
    manager = pywrapcp.RoutingIndexManager(len(data['distance_matrix']),
                                           len(data['vehicle_capacities']), data['starts'], data['ends'])

    # Create Routing Model.
    routing = pywrapcp.RoutingModel(manager)

    # Create and register a transit callback.
    def distance_callback(from_index, to_index):
        print("nnnn")
        """Returns the distance between the two nodes."""
        # Convert from routing variable Index to distance matrix NodeIndex.
        from_node = manager.IndexToNode(from_index)
        to_node = manager.IndexToNode(to_index)
        return data['distance_matrix'][from_node][to_node]

    transit_callback_index = routing.RegisterTransitCallback(distance_callback)

    # Define cost of each arc.
    routing.SetArcCostEvaluatorOfAllVehicles(transit_callback_index)

# Add Capacity constraint.
    def demand_callback(from_index):
        print("oooooooo")
        """Returns the demand of the node."""
        # Convert from routing variable Index to demands NodeIndex.
        from_node = manager.IndexToNode(from_index)
        return data['demands'][from_node]

    demand_callback_index = routing.RegisterUnaryTransitCallback(
        demand_callback)
    routing.AddDimensionWithVehicleCapacity(
        demand_callback_index,
        0,  # null capacity slack
        data['vehicle_capacities'],  # vehicle maximum capacities
        True,  # start cumul to zero
        'Capacity')

    # Setting first solution heuristic.
    search_parameters = pywrapcp.DefaultRoutingSearchParameters()

    # Solve the problem.
    assignment = routing.SolveWithParameters(search_parameters)

    # Print solution on console.
    if assignment:
        print_solution(data, manager, routing, assignment)

if __name__ == '__main__':
    print("222222222")
    second_main()