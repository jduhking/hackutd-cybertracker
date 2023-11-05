import numpy as np
import requests
from flask import Flask, request, jsonify

app = Flask(__name__)


mean = 30
stdev = 5
def calcValue(user_IDs):
    UsersDetails = [{}]
    i  = 0
    for user_ID in user_IDs:
        #print(user_ID)
        listOfBadSites = requests.get(f'https://cybertracker-50ev.onrender.com/user/badmonthlyvisits?id={user_ID}')
        badSites = listOfBadSites.json()
        #print(badSites)
        phishingList = requests.get(f'https://cybertracker-50ev.onrender.com/user/phishing?userid={user_ID}')
        phishingList = phishingList.json()
        #print(phishingList)
        user_info = requests.get(f'https://cybertracker-50ev.onrender.com/user/{user_ID}').json()

        #print(user_info)
        total = user_info["total_sites_visited"]

        
        raw_value = (mean - (len(badSites) + len(phishingList))) / stdev

        if 'safetyScore' not in user_info.keys():
            user_info['safetyScore'] = .70
            user_info['bonus'] = 0

        user_info['safetyScore'] += (raw_value * .01)

        if user_info['safetyScore'] >= .80:
            user_info['bonus'] += raw_value * .85

       # print(user_ID)
        UsersDetails[i]['id'] = user_ID
        UsersDetails[i]['name'] = user_info['name']
        UsersDetails[i]['listOfBadSites?'] = badSites
        UsersDetails[i]['listOfPhishingEmails?'] = phishingList
        UsersDetails[i]['phishingCount'] = len(phishingList)
        UsersDetails[i]['bonus'] = user_info['bonus']
        UsersDetails[i]['safetyScore'] = user_info['safetyScore']
        #print(UsersDetails[i])

    #print(UsersDetails)
    return UsersDetails




# if __name__ == "__main__":
#     print(len(calcValue(['65475ec60d269bf5d990d849'])))
    
    # Define an API endpoint

user_IDs = ['65475ec60d269bf5d990d849']
@app.route('/api/endpoint', methods=['GET'])
def api_endpoint():
    result = calcValue()
    return jsonify({"message": result})

if __name__ == '__main__':
    app.run(debug=True)
    

    
    



"""

interface UserDetails {
  id: string;
  name: string;
  listOfBadSites?: Array<BadSite>;
  listOfPhishingEmails?: Array<PhishingEmails>;
  phishingCount: number;
  bonus: number;
  safetyScore: number;
}

"""