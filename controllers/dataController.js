const https = require('https');
const { query } = require('../utils/db');
const frontendUrl = process.env.FRONTEND_URL;

const checkRowCount = async (table) => {
    const result = await query(`SELECT COUNT(*) as count FROM ${table}`);
    return result[0].count;
};
const sendErrorResponse = (res, errorMessage) => {
    console.error(errorMessage);
    res.send(errorMessage)
};

exports.storeLaunchData = async (req, res) => {
    try {
        const rowCount = await checkRowCount('launches');

        if (rowCount === 0) {
            https.get('https://api.spacexdata.com/v5/launches', (apiRes) => {
                let data = '';

                apiRes.on('data', (chunk) => {
                    data += chunk;
                });

                apiRes.on('end', () => {
                    try {
                        const jsonData = JSON.parse(data);

                        const launchDataValues = jsonData.map((launch) => {
                            const year = new Date(launch.date_utc).getUTCFullYear();
                            const launches = 1;
                            const succesfulLaunches = launch.success ? 1 : 0;
                            const failedLaunches = launch.success ? 0 : 1;

                            return [year, launches, succesfulLaunches, failedLaunches];
                        });

                        const uniqueYears = [...new Set(launchDataValues.map((entry) => entry[0]))];

                        uniqueYears.forEach((year) => {
                            const yearData = launchDataValues.filter((entry) => entry[0] === year);
                            const totalLaunches = yearData.length;
                            const totalSuccessfulLaunches = yearData.reduce((sum, entry) => sum + entry[2], 0);
                            const totalFailedLaunches = yearData.reduce((sum, entry) => sum + entry[3], 0);

                            query(
                                'INSERT INTO launches (year, launches, successful_launches, failed_launches) VALUES (?, ?, ?, ?)',
                                [year, totalLaunches, totalSuccessfulLaunches, totalFailedLaunches]
                            );
                        });
                        res.status(200);
                        res.redirect(`${frontendUrl}/?response=success_store`);
                    } catch (error) {
                        sendErrorResponse(res, error.message);
                    }
                });
            });
        } else {
            res.status(200);
            res.redirect(`${frontendUrl}/?response=already_stored`);
        }

    } catch (error) {
        sendErrorResponse(res, error.message);
    }
}

exports.storeLandpadTypeData = async (req, res) => {
    try {
        const rowCount = await checkRowCount('landpads');
        if (rowCount === 0) {
            https.get('https://api.spacexdata.com/v4/landpads', (apiRes) => {
                let data = '';

                apiRes.on('data', (chunk) => {
                    data += chunk;
                });

                apiRes.on('end', async () => {
                    const jsonData = JSON.parse(data);
                    const asdsLandpads = jsonData.filter((landpad) => landpad.type === 'ASDS').length;
                    const rtlsLandpads = jsonData.filter((landpad) => landpad.type === 'RTLS').length;

                    try {
                        query(
                            'INSERT INTO landpads (asds, rtls) VALUES (?, ?)',
                            [asdsLandpads, rtlsLandpads]
                        );
                        res.redirect(`${frontendUrl}/?response=success_store`);
                    } catch (error) {
                        sendErrorResponse(res, error.message);
                    }
                });
            });
        } else {
            res.status(200)
            res.redirect(`${frontendUrl}/?response=already_stored`);
        }
    } catch (error) {
        sendErrorResponse(res, error.message);
    }
}

exports.storePayloadData = async (req, res) => {
    try {
        const rowCount = await checkRowCount('payloads');
        if (rowCount === 0) {
            https.get('https://api.spacexdata.com/v4/payloads', (apiRes) => {
                let data = '';
                apiRes.on('data', (chunk) => {
                    data += chunk;
                });

                apiRes.on('end', async () => {
                    const jsonData = JSON.parse(data);
                    const payloadTypes = jsonData.map((payload) => payload.type);
                    const uniquePayloadTypes = [...new Set(payloadTypes)];

                    try {
                        for (const type of uniquePayloadTypes) {
                            const typeData = payloadTypes.filter((entry) => entry === type);
                            const totalPayloads = typeData.length;

                            query(
                                'INSERT INTO payloads (type_of_payload, times_launched) VALUES (?, ?)',
                                [type, totalPayloads]
                            );
                        }
                        res.redirect(`${frontendUrl}/?response=success_store`);
                    } catch (error) {
                        sendErrorResponse(res, error.message);
                    }
                });
            });
        } else {
            res.status(200);
            res.redirect(`${frontendUrl}/?response=already_stored`);
        }
    } catch (error) {
        sendErrorResponse(res, error.message);
    }
}

exports.getLaunchData = async (req, res) => {
    try {
        const result = await query('SELECT * FROM launches');
        res.send(result);
    } catch (error) {
        sendErrorResponse(res, error.message);
    }
}

exports.getLandpadTypeData = async (req, res) => {
    try {
        const result = await query('SELECT * FROM landpads');
        res.send(result);
    } catch (error) {
        sendErrorResponse(res, error.message);
    }
}

exports.getPayloadData = async (req, res) => {
    try {
        const result = await query('SELECT * FROM payloads');
        res.send(result);
    } catch (error) {
        sendErrorResponse(res, error.message);
    }
}

exports.test = async (req, res) => {
    try {
        res.send('Hello World');
    } catch (error) {
        sendErrorResponse(res, error.message);
    }
}