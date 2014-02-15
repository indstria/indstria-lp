var require = {
    deps: [
        'vendor/es5-shim.js',
        'vendor/woothee.js',
        'vendor/jquery.js',
        'vendor/bootstrap.js'
    ],
    paths: {
        'mbp': 'vendor/helper'
    },
    shim: {
        mbp: { exports: 'MBP' }
    }
};