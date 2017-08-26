var fetch = require('node-fetch');

var url = 'https://www.instagram.com/graphql/query/?query_id=17874545323001329&variables=%7B%22id%22%3A%223407383%22%2C%22first%22%3A500%7D';
var url_login = 'https://www.instagram.com/accounts/login/ajax/'

var login_details = {
    'username': 'allan.watson',
    'password': ''
}

// var csrftoken = 'csrftoken=mqYKKXnkAr8n2JdTxCDWfDrQRw2vfwEu; expires=Sat, 25-Aug-2018 16:13:12 GMT; Max-Age=31449600; Path=/; Secure';

// fetch(url, {
//   method: 'POST',
//   headers: {
//     'Accept-Encoding': 'gzip, deflate',
//     'Accept-Language': 'en-US,en;q=0.8',
//     'Connection': 'keep-alive',
//     'Content-Length': '0',
//     'Host': 'www.instagram.com',
//     'Origin': 'https://www.instagram.com',
//     'Referer': 'https://www.instagram.com/',
//     'User-Agent': ('Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 \
//             (KHTML, like Gecko) Chrome/48.0.2564.103 Safari/537.36'),
//     'X-Instagram-AJAX': '1',
//     'X-Requested-With': 'XMLHttpRequest'
//   },
//   body: login_details
// })
//   .then(res => res.headers.raw())
//   .then(body => {

//     csrftoken = body['set-cookie'][1];
//     console.log(csrftoken);
//   })
//   .catch(err => console.error(err));



// while(csrftoken){
//   console.log("Waiting...")
// }


fetch(url, {
  method: 'GET',
})
  .then(res => res.json())
  .then(body => {
    console.log( body.data.user.edge_follow.count);

  });