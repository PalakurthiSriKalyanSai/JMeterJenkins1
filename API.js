import { sleep } from 'k6'
import http from 'k6/http'
import { URL } from 'https://jslib.k6.io/url/1.0.0/index.js'
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";

export const options = {
  thresholds: {},
  scenarios: {
    Scenario_1: {
      executor: 'ramping-vus',
      stages: [
        { target: 1, duration: '30s' },
      ],
      exec: 'scenario_1',
    },
  },
}

export function scenario_1() {
  let address, match, response

  const vars = {}

  // Activates
  response = http.get('https://fakerestapi.azurewebsites.net/api/v1/Activities', {
    headers: {
      Accept: 'text/plain',
      v: '1.0',
    },
  })
  console.log(response)

  match = new RegExp('id":(.+?),"title').exec(response.body)

  vars['id'] = match ? match[1] || match[0] : null

  response = http.post(
    'https://fakerestapi.azurewebsites.net/api/v1/Activities',
    '{\r\n  "id": 0,\r\n  "title": "string",\r\n  "dueDate": "2023-01-31T06:19:57.361Z",\r\n  "completed": true\r\n}',
    {
      headers: {
        Accept: 'text/plain',
        v: '1.0',
        'Content-Type': 'application/json',
      },
    }
  )
  console.log(response)

  address = new URL(`https://fakerestapi.azurewebsites.net/api/v1/Activities/${vars['id']}`)
  address.searchParams.append('id', `${vars['id']}`)
  response = http.get(address.toString(), {
    headers: {
      Accept: 'text/plain',
      v: '1.0',
    },
  })
  console.log(response)

  response = http.put(
    `https://fakerestapi.azurewebsites.net/api/v1/Activities/${vars['id']}`,
    `{"id":"${vars['id']}"}`,
    {
      headers: {
        Accept: 'text/plain',
        'Content-Type': 'application/json',
        v: '1.0',
      },
    }
  )
  console.log(response)

  address = new URL(`https://fakerestapi.azurewebsites.net/api/v1/Activities/${vars['id']}`)
  address.searchParams.append('id', `${vars['id']}`)
  response = http.del(address.toString(), null, {
    headers: {
      Accept: '*/*',
    },
  })
  console.log(response)

  // Automatically added sleep
  sleep(1)
}

export function handleSummary(data) {
  return {
    "result_Jenkins.html": htmlReport(data),
    stdout: textSummary(data, { indent: " ", enableColors: true }),
  };
}
