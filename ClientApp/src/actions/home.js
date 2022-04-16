import { setInfo } from '../reducer/ipInfo';

export function fetchIpInfo(ip) {
    return (dispatch) => {
        fetch(`https://freegeoip.app/json/${ip}`)
            .then(res => res.json())
            .then(data => {
                dispatch(setInfo(data))
            });
    }
}
