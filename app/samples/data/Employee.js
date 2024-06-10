Ext.define('SenchaExample.data.employee', {
    requires: [
        'SenchaExample.data.Init'
    ]
}, function () {
    var rndInc = 7,
        rndSeed = rndInc,
        rndMax = Math.pow(2, 31),
        thisYear = (new Date()).getYear() + 1900,
        rnd = function () {
            // we want "random" but consistent values from run-to-run
            rndSeed = (rndSeed * 1664525 + rndInc) % rndMax;

            return rndSeed / rndMax;
        },
        randInt = function (min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);

            return Math.floor(rnd() * (max - min)) + min;  // [ min, max )
        },
        date = function (minYear, maxYear) {
            var y = randInt(minYear, maxYear + 1),
                m = randInt(1, 13),
                d = randInt(1, 29);

            d = (d < 10 ? '0' : '') + d;
            m = (m < 10 ? '0' : '') + m;

            return y + m + d;
        },
        rating = function (item) {
            var d = item.rating = [],
                i;

            for (i = 0; i < 10; ++i) {
                d[i] = randInt(3, 10);
            }

            item.ratingLastYear = Math.max(Math.round(d[0] / 2), 1);
            item.ratingThisYear = Math.max(Math.round(d[d.length - 1] / 2), 1);

            return item;
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
        getRandomHexColor = function () {
            // Generate random red, green, and blue values
            const r = Math.floor(Math.random() * 256); // Random between 0 and 255
            const g = Math.floor(Math.random() * 256);
            const b = Math.floor(Math.random() * 256);

            // Convert decimal to hexadecimal
            const hexR = r.toString(16).padStart(2, '0'); // Convert to 2-digit hex
            const hexG = g.toString(16).padStart(2, '0');
            const hexB = b.toString(16).padStart(2, '0');

            // Concatenate the hex values
            const hexColor = `#${hexR}${hexG}${hexB}`;

            return hexColor;
        },
        departments = shuffle('Accounting,Administration,Engineering,Management,Sales,' +
            'Marketing,QA,Support,Services,Shipping,IT,Executive,Facilities'),
        companies = shuffle('Google,Apple,Dell,Microsoft,Adobe,Meta,Idera'),
        firstNames = shuffle('Baran,Olivia,Nur,Jodi,Marlie,Parris,Nour,Taran,' +
            'Mylie,Dorian,Amelia,Shophia,Brooke,Kaya,Layla,Andrew,Mina,Remi,Thierry,' +
            'Perry,Divine,Elena,Vivian,Elis,Mylie'),
        lastNames = shuffle('Keatinh,Tang,Peterson,Harwood,Fletcher,Riggs,Garner,Cartwright,Bowes,' +
            'Jensen,Emery,Foreman,Jett,Singh,Brock,Richards,Salter,' +
            'Workman,Mckay,Velez,Nolan'),
        countries = {
            "al": "Albania",
            "am": "Armenia",
            "ao": "Angola",
            "ar": "Argentina",
            "at": "Austria",
            "au": "Australia",
            "be": "Belgium",
            "bg": "Bulgaria",
            "bh": "Bahrain",
            "bi": "Burundi",
            "bo": "Bolivia",
            "br": "Brazil",
            "bs": "Bahamas",
            "bt": "Bhutan",
            "ca": "Canada",
            "cg": "Republic of the Congo",
            "ch": "Switzerland",
            "cl": "Chile",
            "cm": "Cameroon",
            "cn": "China",
            "co": "Colombia",
            "cr": "Costa Rica",
            "cy": "Cyprus",
            "de": "Germany",
            "dj": "Djibouti",
            "dk": "Denmark",
            "dm": "Dominica",
            "do": "Dominican Republic",
            "dz": "Algeria",
            "ec": "Ecuador",
            "ee": "Estonia",
            "eg": "Egypt",
            "es": "Spain",
            "et": "Ethiopia",
            "fr": "France",
            "gb": "United Kingdom",
            "gb-eng": "England",
            "gb-nir": "Northern Ireland",
            "gb-sct": "Scotland",
            "gt": "Guatemala",
            "id": "Indonesia",
            "ie": "Ireland",
            "il": "Israel",
            "in": "India",
            "iq": "Iraq",
            "ir": "Iran",
            "is": "Iceland",
            "it": "Italy",
            "jm": "Jamaica",
            "jp": "Japan",
            "ke": "Kenya",
            "kh": "Cambodia",
            "ki": "Kiribati",
            "kr": "South Korea",
            "ma": "Morocco",
            "mn": "Mongolia",
            "mw": "Malawi",
            "mx": "Mexico",
            "na": "Namibia",
            "ng": "Nigeria",
            "nl": "Netherlands",
            "nz": "New Zealand",
            "om": "Oman",
            "pa": "Panama",
            "pe": "Peru",
            "ph": "Philippines",
            "pl": "Poland",
            "pt": "Portugal",
            "py": "Paraguay",
            "qa": "Qatar",
            "ro": "Romania",
            "rs": "Serbia",
            "rw": "Rwanda",
            "sa": "Saudi Arabia",
            "sb": "Solomon Islands",
            "se": "Sweden",
            "sg": "Singapore",
            "th": "Thailand",
            "tl": "Timor-Leste",
            "tn": "Tunisia",
            "tr": "Turkey",
            "tt": "Trinidad and Tobago",
            "ua": "Ukraine",
            "ug": "Uganda",
            "us": "United States",
            "uy": "Uruguay",
            "ve": "Venezuela",
            "vn": "Vietnam",
            "yt": "Mayotte",
            "za": "South Africa",
            "zm": "Zambia",
            "zw": "Zimbabwe"
        },
        countryKeys = Ext.Object.getKeys(countries);

    Ext.ux.ajax.SimManager.register({
        '/sencha-examples/api/employee': {
            type: 'json',
            data: (function () {
                var items = [],
                    i, k, fn, ln, joined, tenure, countryAbbr;

                for (k = 0; k < lastNames.length; ++k) {
                    ln = lastNames[k];

                    for (i = 0; i < firstNames.length; ++i) {
                        fn = firstNames[i];
                        joined = date(thisYear - 12, thisYear);
                        tenure = Math.floor((thisYear - +joined.substr(0, 4)) / 4) + 1; // 0-3 + 1
                        countryAbbr = countryKeys[randInt(0, countryKeys.length - 1)];

                        items.push(rating({
                            employeeNo: '' + randInt(123456, 999999),
                            salary: randInt(5e4, 2e5),
                            forename: fn,
                            surname: ln,
                            email: (fn + '.' + ln + '@senchaaa.com').toLowerCase(),
                            // department: departments[(i + k) % departments.length],
                            department: departments[randInt(0, departments.length)],
                            dob: date(1960, thisYear - 19),
                            joinDate: joined,
                            sickDays: tenure * 5,
                            holidayDays: 4 + tenure,
                            holidayAllowance: 3 + tenure * 4,
                            noticePeriod: randInt(2, 5) + ' weeks',
                            countryCode: countryAbbr,
                            countryName: countries[countryAbbr],
                            company: companies[randInt(0, companies.length)],
                            avatar: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSdj-gG2gXPkOUJGQ2r-3A5AnIgASv19axozeYMWssSVJyySvBIeQ",
                            verified: !!randInt(0, 4),
                            progress: Math.random(),
                            color: getRandomHexColor(),
                            age: randInt(10, 100),
                            bio: 'Lorem ipsum dolor sit amet. Est fugit incidunt vel deserunt eligendi sit facilis nobis qui voluptate sunt quo nisi recusandae? Hic deleniti labore aut sapiente facilis ut quam nemo. Sed quam possimus est esse rerum in quam voluptas aut consequatur enim.',
                            link: 'https://sencha.com/'
                        }));
                    }
                }
                return items;
            }())
        }
    });
});