import trafficMeister from '../service';

export function fetchData() {
    // We don't like callback that much, so let's "promisify" the thing.
    // This way we can use async await syntax, in seek of cleaner code
    return new Promise((resolve, reject) => {
        trafficMeister.fetchData((err, data) => {
            if(err) {
                reject(new Error(err));
            }
            resolve(data);
        });
    });
}
