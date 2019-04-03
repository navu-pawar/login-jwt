module.exports =
        {
            db:
                    {
                        uri: process.env.MONGOHQ_URL || process.env.MONGOLAB_URI || 'mongodb://' + (process.env.DB_1_PORT_27017_TCP_ADDR || '127.0.0.1') + '/loginDemo',
                        options: {
                            user: '',
                            pass: ''
                        }
                    },
            secret: 'ilovecoding',
            serverName: 'localhost',
            apiPath: '/api',
            apiUserPath: '/api/user',
            smtp:
                    {
                        service: '',
                        username: "",
                        email: "",
                        password: "",
                        port: 587
                    }
        };