import trafficMeister from '../service';

export function fetchData() {
    return new Promise((resolve, reject) => {
        trafficMeister.fetchData((err, data) => {
            if(err) {
                reject(new Error(err));
            }
            resolve(data);
        });
    });
}
