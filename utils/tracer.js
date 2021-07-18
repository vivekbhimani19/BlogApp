const colors = require('colors'),
    logger = require('tracer')
        .colorConsole({
            format: [
                "[{{title}}\t{{timestamp}}] [{{file}} @ {{line}}] {{path}} Call From {{method}} \t {{message}}", //default format
                {
                    error: "[{{title}}\t{{timestamp}}] [{{file}} @ {{line}}] {{path}} Call From {{method}} \t {{message}} \nCall Stack:\n{{stack}}", // error format
                    info: "[{{title}}\t{{timestamp}}] [{{file}} @ {{line}}] \t {{message}}", // info

                }
            ],
            filters: {
                trace: colors.magenta,
                debug: colors.blue,
                info: colors.cyan,
                warn: colors.yellow,
                error: [colors.red, colors.bold],
            },
            dateformat: "HH:MM:ss.L",
            preprocess: function (data) {
                data.title = data.title.toUpperCase();
                data.file = data.file.toUpperCase();
                data.line = data.line.padStart(5);
            },
            // level: config.logger[config.environment].level
        });
module.exports = logger;