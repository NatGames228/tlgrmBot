const COMMANDS = [
    {
        command: "friday",
        description: "Показать пятничную подборку",
    },
    {
        command: "video",
        description: "Найти и показать видеоконтент",
        // hint: true,
        // help: true,
    },
    {
        command: "subscribe",
        description:
        "Подписаться на пятничную подборку (рассылка выходит по пятницам)",
    },
    {
        command: "unsubscribe",
        description: "Отписаться от рассылки",
    },
    {
        command: "help",
        description: "Показать справку",
    },
    {
        command: "quit",
        description: "Отписаться от рассылки, выйти из чата",
    },
];

module.exports = COMMANDS;