const {assert} = require('chai');
const DHubStore = artifacts.require('DHubStore');

let DHubStoreInstance;

contract('DHubStore', (accounts) => {
    const [adminAccount, userAccount, devAccount] = accounts;
    beforeEach(async () => {
        DHubStoreInstance = await DHubStore.new({
            from: adminAccount,
        });

        // published app sample
        await DHubStoreInstance.requestToPublishApp(
            'test app',
            'des',
            'img',
            'code',
            {
                from: devAccount,
            },
        );

        await DHubStoreInstance.publishApp(
            0,
            {
                from: adminAccount,
            },
        );
    });

    it('DHub contract should be deployed successfully', async () => {
        assert.ok(DHubStoreInstance.address);
    });

    it('Dev should be able to request to publish their apps', async () => {
        // request to publish app with a dev account
        await DHubStoreInstance.requestToPublishApp(
            'name',
            'des',
            'img',
            'code',
            {
                from: devAccount,
            },
        );

        // query apps that have been requested
        const requestedApps = await DHubStoreInstance.getAllRequestedApps(adminAccount);
        // console.log('requestedApps: ', requestedApps)

        // check if the app is stored in the request queue or not
        assert.equal(
            requestedApps.length = 1,
            true,
        );
    });

    it('Dev should NOT be able to publish their apps', async () => {
        await DHubStoreInstance.requestToPublishApp(
            'name',
            'des',
            'img',
            'code',
            {
                from: devAccount,
            },
        );

        let error = null;

        // request to publish app with a dev account
        try {
            await DHubStoreInstance.publishApp(
                0,
                {
                    from: devAccount,
                },
            );
        } catch(err) {
            error = err;
        }

        // an error should be returned
        assert.notEqual(
            error,
            null,
        );
    });

    it('Admin should be able to publish apps', async () => {
        await DHubStoreInstance.requestToPublishApp(
            'name',
            'des',
            'img',
            'code',
            {
                from: devAccount,
            },
        );

        let error = null;

        // request to publish app with a dev account
        try {
            await DHubStoreInstance.publishApp(
                0,
                {
                    from: adminAccount,
                },
            );
        } catch(err) {
            error = err;
        }

        // No error should be returned
        assert.equal(
            error,
            null,
        );
    });

    it('User shuold be able to use apps', async () => {
        let error = null;

        try {
            await DHubStoreInstance.useApp(
                0,
                {
                    from: userAccount,
                },
            );
        } catch(err) {
            error = err;
        }

        // No error should be returned
        assert.equal(
            error,
            null,
        );
    });

    it('User should be able to view app info except app code', async () => {
        let error = null;

        try {
            const info = await DHubStoreInstance.getAppInfo(0);
            console.log(info);
        } catch(err) {
            error = err;
        }

        // No error should be returned
        assert.equal(
            error,
            null,
        );
    });
});
