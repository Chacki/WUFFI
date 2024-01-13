
import fetch from "node-fetch";
import {HeadersJson} from "../../util/headers/HeadersJson.js";
import {generate_uuid} from "../../util/generate/UUID/gen_uid.js";

export async function track (email, wallet, headers) {

    const cid = btoa(generate_uuid())


    let POST = new HeadersJson().POST('', headers.user_agent, headers.sec_ch_ua, headers.accept_language)
    delete POST.cookie
    POST['origin'] = 'https://www.wuffi.io'
    POST['referer'] = 'https://www.wuffi.io/'
    POST['sec-fetch-site'] = 'cross-site'
    POST['accept'] = 'application/json'

    const track_1 = await fetch('https://a.klaviyo.com/onsite/track-analytics?company_id=XQ6vwv', {
        method: 'POST',
        body: JSON.stringify({
            "metric_group": "signup-forms",
            "events": [
                {
                    "metric": "stepSubmit",
                    "log_to_statsd": true,
                    "log_to_s3": true,
                    "log_to_metrics_service": true,
                    "metric_service_event_name": "submitted_form_step",
                    "event_details": {
                        "form_version_c_id": "1",
                        "is_client": true,
                        "submitted_fields": {
                            "$email": email,
                            "Wallet": wallet,
                            "$consent_method": "Klaviyo Form",
                            "$consent_form_id": "VN2YNC",
                            "$consent_form_version": 12043947,
                            "sent_identifiers": {},
                            "$step_name": "Email Opt-In"
                        },
                        "step_name": "Email Opt-In",
                        "step_number": 1,
                        "action_type": "Submit Step",
                        "form_id": "VN2YNC",
                        "form_version_id": 12043947,
                        "form_type": "FLYOUT",
                        "device_type": "DESKTOP",
                        "hostname": "www.wuffi.io",
                        "href": "https://www.wuffi.io/",
                        "page_url": "https://www.wuffi.io/",
                        "first_referrer": "https://www.wuffi.io/",
                        "referrer": "https://www.wuffi.io/",
                        "cid": cid
                    }
                }
            ]
        }),
        headers: POST
    })
    let json = await track_1.json()
    console.log(json)
    console.log(track_1.status)

    const track_2 = await fetch('https://a.klaviyo.com/onsite/track-analytics?company_id=XQ6vwv', {
        method: 'POST',
        body: JSON.stringify({
            "metric_group": "signup-forms",
            "events": [
                {
                    "metric": "submitModal",
                    "log_to_statsd": true,
                    "log_to_s3": true,
                    "log_to_metrics_service": true,
                    "metric_service_event_name": "engaged_with_form",
                    "event_details": {
                        "form_version_c_id": "1",
                        "is_client": true,
                        "submitted_fields": {
                            "$email": email,
                            "Wallet": wallet,
                            "$consent_method": "Klaviyo Form",
                            "$consent_form_id": "VN2YNC",
                            "$consent_form_version": 12043947,
                            "sent_identifiers": {}
                        },
                        "action_type": "Submit Form",
                        "form_id": "VN2YNC",
                        "form_version_id": 12043947,
                        "form_type": "FLYOUT",
                        "device_type": "DESKTOP",
                        "hostname": "www.wuffi.io",
                        "href": "https://www.wuffi.io/",
                        "page_url": "https://www.wuffi.io/",
                        "first_referrer": "https://www.wuffi.io/",
                        "referrer": "https://www.wuffi.io/",
                        "cid": cid
                    }
                }
            ]
        }),
        headers: POST
    })
    console.log(track_2.status)


    const track_3 = await fetch('https://a.klaviyo.com/onsite/track-analytics?company_id=XQ6vwv', {
        method: 'POST',
        body: JSON.stringify({
            "metric_group": "signup-forms",
            "events": [
                {
                    "metric": "viewedStep",
                    "log_to_statsd": true,
                    "log_to_s3": true,
                    "log_to_metrics_service": true,
                    "metric_service_event_name": "viewed_form_step",
                    "event_details": {
                        "form_version_c_id": "1",
                        "is_client": true,
                        "step_name": "Success",
                        "step_number": 2,
                        "form_id": "VN2YNC",
                        "form_version_id": 12043947,
                        "form_type": "FLYOUT",
                        "device_type": "DESKTOP",
                        "hostname": "www.wuffi.io",
                        "href": "https://www.wuffi.io/",
                        "page_url": "https://www.wuffi.io/",
                        "first_referrer": "https://www.wuffi.io/",
                        "referrer": "https://www.wuffi.io/",
                        "cid": cid
                    }
                }
            ]
        }),
        headers: POST
    })
    console.log(track_3.status)
}



