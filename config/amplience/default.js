module.exports = {
    default: {
        hub: 'sfcccompdev2',
    },
    envs: [
        {
            name: 'Live',
            hub: 'sfcccomposable',
            vse: '1pqebtas9axy7zeeiy96389op.staging.bigcontent.io'
        },
        {
            name: 'UAT',
            hub: 'sfcccompuat',
            vse: 'e7ssecddcjvq1470dg00ennz9.staging.bigcontent.io'
        },
        {
            name: 'Development 2',
            hub: 'sfcccompdev2',
            vse: '1jade04tmvsq21rjusvaue8p27.staging.bigcontent.io'
        },
        {
            name: 'Development',
            hub: 'sfcccompdev',
            vse: '11pas6cl3x9ck1bbgcbsl1e6tk.staging.bigcontent.io'
        },
        {
            name: 'Automation Test 01 - Réza',
            hub: 'automation01',
            vse: '1dpf8i5xxl3cn1xccm0grjyowp.staging.bigcontent.io'
        },
        {
            name: 'Automation Test 02 - Réza',
            hub: 'automation02',
            vse: 'jf7r926acbou18fx7sz7374ij.staging.bigcontent.io'
        },
        {
            name: 'Automation Test 03 - Réza',
            hub: 'automation03',
            vse: 'uydimqk8ysu21nh1pqhm0w8ry.staging.bigcontent.io'
        }
    ],
    visualisations: [
        {
            name: 'Localhost',
            default: true,
            url: 'http://localhost:3000'
        },
        {
            name: 'Live',
            default: false,
            url: 'https://ascc-production.mobify-storefront.com'
        },
        {
            name: 'UAT',
            default: false,
            url: 'https://ascc-uat.mobify-storefront.com'
        },
        {
            name: 'Development 2',
            default: false,
            url: 'https://ascc-development-2.mobify-storefront.com'
        },
        {
            name: 'Development',
            default: false,
            url: 'https://ascc-development.mobify-storefront.com'
        }
    ]
}