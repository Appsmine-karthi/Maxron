const request = require("request");
const dotenv = require("dotenv");
const Video = require("../models/video/Video");
var FCM         = require('fcm-node');
const axios     = require("axios");
var { SendMailClient } = require("zeptomail");
const crypto = require('crypto');
dotenv.config();
const Common = function (data) {
  this.data = data;
};
//Common Status
Common.prototype.commonStatus = (data, status, alert) => {
  if (status == 1) {
    var message = {
      message: "Success",
      alert: alert,
      data: data,
      status: "True",
      status_code: 200,
    };
  } else {
    var message = {
      message: "Fail",
      alert: alert,
      data: data,
      status: "Fail",
      status_code: 400,
    };
  }
  return message;
};
//Common Validate Status
Common.prototype.validateEmpty = (data) => {
  var classCount = new Common();

  return classCount.commonStatus(data, 0, "please fill mentory field");
};
//Empty value check
Common.prototype.emptyCheck = (data) => {
  if (data) {
    var dataValue = data;
  } else {
    var dataValue = "";
  }
  return dataValue;
};
//Common Url
Common.prototype.commonUrl = ()=>{
 let url = null;
  return url;
}
//Empty value check
Common.prototype.emptyCheckRfId = (data) => {
  if (data) {
    var dataValue = data;
  } else {
    var dataValue = null;
  }
  return dataValue;
};
//Common Date Formats
Common.prototype.commonDateGet = () =>{
  const dateTime = new Date();
  dateTime.setHours(dateTime.getHours() + 5);
  dateTime.setMinutes(dateTime.getMinutes() + 30);
 return dateTime;
}
//color therapy date formats
Common.prototype.commonDateGetNumberFormat = () =>{
  const dateTime = new Date();
  const dateGet  = dateTime.getDate();
  const sum = dateGet % 9 || 9;
 return sum;
}
//Empty value check in Integer
Common.prototype.emptyIntegerCheck = (data) => {
  if (data) {
    var dataInt = data;
  } else {
    var dataInt = 0;
  }
  return dataInt;
};

Common.prototype.getFormatedDateString = (dateString) => {
  const date = new Date(dateString);
  return `${date.getDate() < 10 ? "0".toString() : ""}${date.getDate()}/${date.getMonth() + 1 < 10 ? "0".toString() : ""}${date.getMonth()+1}/${date.getFullYear()}`;
}
Common.prototype.getNewDateWithFormat = (dateString) => {
  const date = new Date(dateString);
  // return `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`;
  let someDate =    new Date(date.getFullYear() ,date.getMonth()+1 , date.getDate() );
  return someDate.setTime(someDate.getTime());
}
// Date convert the Milliseconds
Common.prototype.dateConvertMillisecondWithDate = (dateFormat) =>{
  let   dateString = dateFormat;
  let    dateArgs = dateString.match(/\d{2,4}/g);
  let    year = dateArgs[2];
  let    month = parseInt(dateArgs[1]) - 1;
  let   day = dateArgs[0];

  let someDate = new Date(year, month, day)

  return someDate.setTime(someDate.getTime())

}


Common.prototype.dateConvertMillisecondWithDateArray = (dateFormat) =>{
  let   dateString = dateFormat;
  let    dateArgs = dateString.match(/\d{2,4}/g);
  let    year = dateArgs[2];
  let    month = parseInt(dateArgs[1]) - 1;
  let   day = dateArgs[0];

  let someDate = new Date(year, month, day)

  someDate.setTime(someDate.getTime() +  (-1 * 24 * 60 * 60 * 1000));

  const common = new Common();

  let array = [{
    milliseconds : new Date(year, month, day).getTime() - 86400000,
    dateFormat : common.getFormatedDateString(new Date(year, month, day).setTime(new Date(year, month, day).getTime() +  (-1 * 24 * 60 * 60 * 1000)))
  },{
    milliseconds : new Date(year, month, day).getTime() ,
    dateFormat : dateFormat
  },{
    milliseconds : new Date(year, month, day).getTime() + 86400000 ,
    dateFormat : common.getFormatedDateString(new Date(year, month, day).setTime(new Date(year, month, day).getTime() +  (1 * 24 * 60 * 60 * 1000)))
  },
]
  return  array;
}
// Single Apis
Common.prototype.dateConvertMillisecond = (dateFormat) =>{
  let   dateString = dateFormat;
  let    dateArgs = dateString.match(/\d{2,4}/g);
  let    year = dateArgs[2];
  let    month = parseInt(dateArgs[1]) - 1;
  let   day = dateArgs[0];
  return new Date(year, month, day).getTime()
}

//Empty value check in OrderBy
Common.prototype.emptyOrderByCheck = (data) => {
  if (data) {
    var dataInt = data;
  } else {
    var dataInt = "desc";
  }
  return dataInt;
};
//Common Date Format Get
Common.prototype.getDateFormat = () => {
  let yourDate = new Date();
  return yourDate.toISOString().split("T")[0];
};
//Empty value check in OrderBy
Common.prototype.emptyOrderByNameCheck = (data) => {
  if (data) {
    var dataInt = data;
  } else {
    var dataInt = "rfId";
  }
  return dataInt;
};
// Filter Check Key
Common.prototype.keyUpdateInObject = (
  array,
  registerKey,
  registerName,
  registerArray
) => {
  if (array?.some((a) => a.key === registerKey)) {
    return array?.map((data, index) =>
      data.key === registerKey ? (data.name = registerName) : data
    );
  } else {
    return array.push(registerArray);
  }
};
// Common Like and share filter
Common.prototype.filterLikeData = function (videos, userId) {
  return new Promise(async (resolve, reject) => {
    const common = new Common();
       let videoData =   videos.map((filterData, index) =>{          
          filterData.likeStatus = filterData.likes.some( like=> like.user.toString().includes(userId));
          filterData.viewStatus = filterData.views.some( view=> view.user.toString().includes(userId));
          filterData.favoriteStatus = filterData.favorites.some( favorite=> favorite.user.toString().includes(userId));
          return filterData;           
       })    
      resolve(videoData);
  })
}

//translate multiple title and description data
Common.prototype.titleSpliter = function (JobArray, language) {

  return new Promise(async (resolve, reject) => {

    const common = new Common();
    await common
      .Translate(language, JobArray.title[0].name)
      .then(async (response) => {
        JobArray.title.push({ key: `${language}`, name: `${response[0]}` });
      })
      .catch((err) => {
        console.log(err);
      });
    await common
      .Translate(language, JobArray.description[0].name)
      .then(async (response) => {
        JobArray.description.push({
          key: `${language}`,
          name: `${response[0]}`,
        });
      })
      .catch((err) => {
        console.log(err);
      });
    // console.log(JobArray._id)
    await Job.updateOne({ _id: JobArray._id }, { $set: { title: JobArray.title, description: JobArray.description } }).then((response) => {
      resolve(JobArray)
    })
  })
}
//Excel Sheets
Common.prototype.createSheet = (json) => {

  return new Promise(resolve => {

// setup workbook and sheet
var wb = new xl.Workbook();

var style = wb.createStyle({
    font: {
        bold: true
      },
      alignment: {
        wrapText: true,
        horizontal: 'center',
      },
  });

var ws = wb.addWorksheet('Sheet');

// Add a title row
ws.cell(1, 1)
  .number(1000)
  .style(style) 
  .string('S.No')
ws.cell(1, 2)
  .number(1000)
  .style(style) 
  .string('Name')

ws.cell(1, 3)
  .style(style) 
  .string('Mobile Number')

ws.cell(1, 4)
  .style(style) 
  .string('Location')

ws.cell(1, 5)
  .style(style) 
  .string('Category')

// add data from json
let c= 0;

for (let i = 0; i < json.length; i++) {
  let row = i + 2
  c = c+1;
  ws.cell(row, 1)
  .style(style) 
  .string(c)

  ws.cell(row, 2)
    .style(style) 
    .string(json[i].name)

  ws.cell(row, 3)
    .style(style) 
    .number(json[i].mobileNo)

  ws.cell(row, 4)
    .style(style) 
    .string(json[i].cityId === undefined ? "-" : json[i].cityId.cityName)

  json[i].education.skills.length > 0 ? json[i].education.skills.map((a)=>{  ws.cell(row, 5)
    .style(style) 
    .string(a.jobSkillsName + ",")  }) : "-"

 
}

resolve( wb )

  })
}

//Excel Sheet triggers
Common.prototype.generateExcelSheet = async (data) =>{
  return new Promise(async(resolve, reject)=>{
    const common = new Common();

    console.log(`data -${ JSON.stringify(data) }`)
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + "-" + today.getMinutes() + "-" + today.getSeconds();
    var dateTime = date+'-'+time;

   await common.createSheet(data).then( file => {
         file.write(`public/excel/${ dateTime }.xlsx`);
   
     })

     var Url = common.commonUrl();
                          
     var fmbRegisterFile = `excel/${dateTime}.xlsx`;

     var excelUrl = `${ Url }${ fmbRegisterFile }`;
  
     resolve(common.commonStatus(excelUrl,1,"Excel Sheets"));          


  })

}


// Job View Count Add
Common.prototype.feedsFilterViewCountUpdate =async (feedData) =>{
  console.log(`feedData - ${ JSON.stringify(feedData) }`)
  feedData.length > 0 && feedData.map(async(data,index)=>{  
      await Video.updateOne({ _id: data?._id }, { $inc: { viewCount: 1 } })  
  });
}
// Job View Count Added
Common.prototype.jobViewCountUpdate =async (jobData) =>{
  jobData.length > 0 && jobData.map(async(data,index)=>{   
      await Video.updateOne({ _id: data?._id }, { $inc: { Video: 1 } })
 
  });
}
// Job data Filter and get data
Common.prototype.jobFilterData = function (JobArray, language) {
  return new Promise(async (resolve, reject) => {

    const common = new Common();

    await Promise.all(JobArray.map(async (data, index) => {
      if (data?.title.some((a) => a.key === language)) {
        return data;
      } else {
        return await common.titleSpliter(data, language).then((response) => {
          return response;
        })

      }
    })).then((response) => {

      resolve(response)

    }).catch((err) => {

      reject(err)
    })
  });
};

Common.prototype.Translate = function (language, text) {
  return new Promise(async (resolve, reject) => {
    const translate = new Translate({
      credentials: JSON.parse(process.env.CREDENTIALS),
      projectId: process.env.PROJECTID,
    });

    await translate
      .translate(text, language)
      .then((response) => {
        resolve(response);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
//Common Notification Save
Common.prototype.notificationSave = function (
  memberId,
  title,
  content,
  images
) {
  return new Promise(async (resolve, reject) => {
    let notificationType = 1;

    let connect = new Notification({
      memberId,
      title,
      content,
      images,
      notificationType,
    });
    const data = await connect.save();

    if (data) {
      resolve(data);
    }
  });
};
// Common Daily Sun Data Get
Common.prototype.dailySunDataGet = function (zodiacId, zodiacDate) {
  return new Promise(async (resolve, reject) => {  
    request(
      {      
        url: `https://api.vedicastroapi.com/v3-json/prediction/daily-sun?zodiac=${zodiacId}&date=${zodiacDate}&show_same=true&api_key=fb46aa8a-d0cb-5bb2-9344-d4f9a51cd00a&lang=en&split=true&type=big`,
        method: "GET",
      },
      function (error, response, body) {
        if (error) {
          console.log(error);
          reject(error);
        } else {
          let status = JSON.parse(response.body);
          resolve({response, status});
        }
      }
    );
  });
};

// Common Call Api's Trigger
Common.prototype.commonCallRegister = function (From, To, TimeLimit) {
  console.log(`from - ${ From }`)
  console.log(`to - ${ To }`)
  console.log(`Time Limit - ${ TimeLimit }`)
  const classCount = new Common()
  return new Promise(async (resolve, reject) => {    
    const Url = `https://${process.env.EXOTEL_API_KEY}:${process.env.EXOTEL_SECRET_KEY}${process.env.EXOTEL_SUBDOMAIN}/v1/Accounts/${process.env.EXOTEL_SID}/Calls/connect`; 
    let bodyFormData = new FormData();
    bodyFormData.append('From', From);
    bodyFormData.append('To', To);
    bodyFormData.append('CallerId', process.env.EXOTEL_CALLERID);
    bodyFormData.append('TimeLimit', parseInt(TimeLimit));
    bodyFormData.append('CallType', "trans");
    bodyFormData.append('StatusCallback', process.env.EXOTEL_CALLBACK_STATUS);
    bodyFormData.append('StatusCallbackContentType', 'application/json');
    bodyFormData.append('Record', true);
    bodyFormData.append('StatusCallbackEvents[0]', 'terminal');
    // bodyFormData.append('RecordingChannels', true);   
    await  axios.post(Url, bodyFormData, {headers: { "Content-Type": "form-data" }}).then((response)=>{
       console.log(`Response - ${JSON.stringify(response.data) }`);
       resolve(classCount.commonStatus(response.data, true , "Response"))
    }).catch((error)=>{
      console.log(`Error - ${JSON.stringify(error) }`);
      reject(classCount.commonStatus(error, false, "Error Messages"))
      // return res.status(500).send(common.commonStatus(error, false , "Server Error"))
    })

  });
};
//Common phonepe encryption
Common.prototype.commonPhonePeWebEncryptionData = (mobileNumber,merchantTransactionId, amount ,merchantUserId  ) => {
  return new Promise(async (resolve, reject) => {

    const data =  {
      "merchantId": process.env.PHONEPE_MERCHANTID,
      "merchantTransactionId": merchantTransactionId,
      "merchantUserId": merchantUserId,
      "amount": amount,
      "redirectUrl": process.env.PHONEPE_REDIRECT_URL,
      "redirectMode": process.env.PHONEPE_MODE,
      "callbackUrl": process.env.PHONEPE_CALLBACK_URL,
      "mobileNumber": mobileNumber,
      "paymentInstrument": {
        "type": "PAY_PAGE"
      }
    }
       const payload = JSON.stringify(data);
  
       const payloadData = Buffer.from(payload).toString("base64");
  
       const key = process.env.PHONEPE_SALT_KEY;
  
       const keyIndex = process.env.PHONEPE_KEY_INDEX;
  
       const string = payloadData+"/pg/v1/pay"+key;
  
       const sha256 = crypto.createHash('sha256').update(string).digest("hex");
  
       const checksum = sha256+'###'+keyIndex;
  
       const Url = process.env.PHONEPE_URL;

       const payloadDataReturn = {
        checksum : checksum,
        payload: { request:payloadData },
        url : Url
       }
      resolve(payloadDataReturn);
  })  
};

//
Common.prototype.commonPhonePeEncryptionData = (mobileNumber,merchantTransactionId, amount ,merchantUserId  ) => {
  return new Promise(async (resolve, reject) => {
    const data = {
      "merchantId": process.env.PHONEPE_MERCHANTID,
      "merchantTransactionId": merchantTransactionId,
      "merchantUserId": merchantUserId,
      "amount": amount * 100,
      // "callbackUrl": "https://webhook.site/9655f3e1-be37-458f-bfa4-71ebfb9ce17d",
      "callbackUrl": "https://dev-api.astrocure.co.in/api/v1/callback-status",
      "mobileNumber": mobileNumber,
      "paymentInstrument": {
      "type": "PAY_PAGE"
      }
      }
       const payload = JSON.stringify(data);
  
       const payloadData = Buffer.from(payload).toString("base64");
  
       const key = process.env.PHONEPE_SALT_KEY;
  
       const keyIndex = process.env.PHONEPE_KEY_INDEX;
  
       const string = payloadData+"/pg/v1/pay"+key;
  
       const sha256 = crypto.createHash('sha256').update(string).digest("hex");
  
       const checksum = sha256+'###'+keyIndex;
  
       const Url = process.env.PHONEPE_URL;
       
       const payloadDataReturn = {
        data: {
          checksum : checksum,
          payload: { request:payloadData },
          url : Url
        },
        response: payload
       }
      resolve(payloadDataReturn);
  })  
};

// Common Sms Send
Common.prototype.sms = function (mobileNo, otp) {
  return new Promise(async (resolve, reject) => {
    request(
      {      
        url: `http://bulksmscoimbatore.co.in/sendsms?uname=astvid&pwd=astvid@123&senderid=ASTVID&to=${mobileNo}&msg=Your AstroCure account OTP is ${otp}, valid for 30 minutes. Keep it confidential, and please do not share it with anyone. ASTROVIDHI&route=T`,
        method: "GET",
      },
      function (error, response, body) {
        if (error) {
          console.log(error);
          reject(error);
        } else {
          console.log(response.statusCode)
          console.log(body)
          resolve(response.statusCode, body);
        }
      }
    );
  });
};
// Common Zoho mail Send
Common.prototype.commonMailSend = function (mailId, subject , htmlBody) {
  return new Promise(async (resolve, reject) => {
    const url = process.env.ZOHO_MAIL_URL;
    const token = process.env.ZOHO_ACCESS_KEY;
    let client = new SendMailClient({url, token});

client.sendMail({
    "from": 
    {
        "address": "noreply@astrocure.co.in",
        "name": "noreply"
    },
    "to": 
    [
        {
        "email_address": 
            {
                "address": mailId,
                "name": "karthi"
            }
        }
    ],
    "subject": subject,
    "htmlbody": htmlBody,
}).then((resp) => resolve(resp)).catch((error) => reject(error));
   
  });
};
Common.prototype.maplocation = function (lat, lng) {
  return new Promise(async (resolve, reject) => {
    // console.log(`Map location Api triggers `);
    request(
      {
        url: `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.MAPAPI}`,
        method: "GET",
      },
      function (error, response, body) {
        if (error) {
          console.log(error);
          reject(error);
        } else {
          // console.log(`response - ${ JSON.stringify(response.body) }`)
          resolve(JSON.parse(response?.body));
        }
      }
    );
  });
};
//Address to get latitude and longitude location
Common.prototype.mapGeoLocationGetLatitudeAndLongitude = function (
  address1,
  address2,
  city,
  district
) {
  return new Promise(async (resolve, reject) => {
    request(
      {
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${address1},${address2},${city},${district}&key=${process.env.MAPAPI}`,
        method: "GET",
      },
      function (error, response, body) {
        if (error) {
          console.log(error);
          reject(error);
        } else {
          // console.log(`response - ${ JSON.stringify(response.body) }`)
          resolve(JSON.parse(response?.body));
        }
      }
    );
  });
};

//Address to Send Email
Common.prototype.sendEmail = function (
  mailAddress,
  title,
  content
) {
  return new Promise(async (resolve, reject) => {
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'noreplytaakapp@gmail.com',
        pass: 'cjgqlsfgjtzsfyub'
      }
    });
    
    var mailOptions = {
      from: 'noreplytaakapp@gmail.com',
      to: [mailAddress],
      subject: title,
      text: content
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  });
};
//Firebase Notification Push
Common.prototype.notification = function (
  tokenId,
  title,
  data,
  images 
) {
  return new Promise(async (resolve, reject) => {
    const common = new Common();

    var serverKey = process.env.SERVER_KEY;
   
    var fcm = new FCM(serverKey);
      //   tokenId.map(Data=>{
    var message = {
      to: tokenId,
      collapse_key: "green",

      notification: {
        title: title,
        body: data,
        image: images,
      },
      data: {
        my_key: "my value",
        my_another_key: "my another value",
      },
    };

    fcm.send(message, function (err, response) {
      if (err) {
         console.log("Something has gone wrong!" + err);
         resolve(err)
        // reject(err);
      } else {
        console.log("Successfully sent with response: ", response);
        // common.notificationSave(memberId, title, content, images);
        resolve(response);
      }
    });
    //  })
  });
};
module.exports = Common;
