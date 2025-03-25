Ext.define('SenchaExample.data.agents', {
    requires: [
        'SenchaExample.data.Init'
    ]
}, function () {
    var rndInc = 7,
        rndSeed = rndInc,
        rndMax = Math.pow(2, 31),
        thisYear = (new Date()).getFullYear(),
        rnd = function () {
            rndSeed = (rndSeed * 1664525 + rndInc) % rndMax;
            return rndSeed / rndMax;
        },
        randInt = function (min, max) {
            return Math.floor(rnd() * (max - min)) + min; // [min, max)
        },
        date = function (minYear, maxYear) {
            var y = randInt(minYear, maxYear + 1),
                m = randInt(1, 13),
                d = randInt(1, 29);

            d = (d < 10 ? '0' : '') + d;
            m = (m < 10 ? '0' : '') + m;

            return y + '-' + m + '-' + d; // Format: YYYY-MM-DD
        },
        shuffle = function (items) {
            var ret = items.split(','),
                n = ret.length,
                i, j, k, t;

            for (i = ret.length; i-- > 0; /* empty */) {
                j = randInt(0, n);

                while ((k = randInt(0, n)) === j) {
                    // empty
                }

                t = ret[j];
                ret[j] = ret[k];
                ret[k] = t;
            }

            return ret;
        },
        regions = shuffle('North,South,East,West,Central'),
        companies = shuffle('MakeMyTrip,Yatra,Cleartrip,Goibibo,TravelGuru,Expedia,Thomas Cook,Akbar Travels'),
        firstNames = shuffle('Aarav,Vihaan,Aditya,Arjun,Krishna,Ananya,Ishita,Diya,Meera,Navya'),
        lastNames = shuffle('Sharma,Verma,Gupta,Mehta,Patel,Joshi,Kapoor,Agarwal,Chopra,Malhotra');

    Ext.ux.ajax.SimManager.register({
        '/sencha-examples/api/agents': {
            type: 'json',
            data: (function () {
                var items = [],
                    i, fn, ln, joined, region;

                for (i = 0; i < 100; i++) { // Generate 100 agents
                    fn = firstNames[randInt(0, firstNames.length)];
                    ln = lastNames[randInt(0, lastNames.length)];
                    joined = date(thisYear - 10, thisYear); // Join date within the last 10 years
                    region = regions[randInt(0, regions.length)];

                    items.push({
                        agentId: 'TA-' + randInt(1000, 9999),
                        name: fn + ' ' + ln,
                        email: (fn + '.' + ln + '@travelco.com').toLowerCase(),
                        region: region,
                        bookings: randInt(50, 500), // Number of bookings
                        revenue: randInt(5000, 50000), // Revenue in USD
                        rating: randInt(1, 5), // Rating out of 5
                        joinDate: joined,
                        active: !!randInt(0, 2), // Randomly set active status
                        company: companies[randInt(0, companies.length)]
                    });
                }

                return items;
            }())
        }
    });
});