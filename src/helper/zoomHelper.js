const axios = require('axios')
const api_base_url = "https://api.zoom.us/v2"


//The config information has been taken from Postman
let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://zoom.us/oauth/token?grant_type=account_credentials&account_id=vQIR_S5xTJ-GjIUNgzN_eQ',
    headers: {
        'Authorization': 'Basic XzN0Z1BwdnRRZmFVcjdMRlhwSVpiUTo0c1h0QUtqOFo4SUxRSTE2RVkzMUg1eElVanR3bGI1Zw=='
    }
};
exports.createZoomMeeting = async (topic, duration, start_time, password) => {
    try{
        let authResponse
        await axios.request(config)
            .then((response) => {
                authResponse = response.data;
            })
            .catch((error) => {
                console.log(error);
            });

        const access_token = authResponse.access_token

        const headers = {
            'Authorization': `Bearer ${access_token}`,
            'Content-Type': 'application/json'
        }


        let data = JSON.stringify({
            "topic": topic,
            "type": 2,
            "start_time": start_time.utc().format(),
            "duration": duration,
            "password": password,
            "settings": {
                "allow_multiple_devices": true,
                "join_before_host": true,
                "waiting_room": false
            }
        });

        const meetingResponse = await axios.post(`${api_base_url}/users/me/meetings`, data, { headers });

        if (meetingResponse.status !== 201) {
            return 'Unable to generate meeting link'
        }

        const response_data = meetingResponse.data;

        const content = {
            meeting_url: response_data.join_url,
            meetingTime: response_data.start_time,
            purpose: response_data.topic,
            duration: response_data.duration,
            message: 'Success',
            password: password,
            status: 1
        };

        return content

    }catch (e) {
        console.log(e)
    }
}


