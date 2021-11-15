// https://dev.to/slkarol/nodejs-1-o7

// require("dotenv").config();
const fetch = require("node-fetch");
const { Telegraf } = require("telegraf");
const { Markup } = require('telegraf')

const commandParts = require("./lib/commandParts");
const { randomAnimal } = require("./lib/animalPhoto");
const COMMANDS = require("./const/commands");

const token;
const bot = new Telegraf(token);

bot.use(commandParts);

bot.start((ctx) =>
    ctx.reply(
        `Приветствую, ${
        ctx.from.first_name ? ctx.from.first_name : "хороший человек"
    }! Нажми на пункт из меню и увидишь, что я могу.`,
   {
    reply_markup: {
        keyboard: [["Музей КАИ"], ["Видео"], ["Направления"], ["Фото"], ["Аудио"]],
        // one_time_keyboard: true,
    },
})
);

bot.help((ctx) => {
    let helpText = `Телеграм-бот, созданный для развлечения, а не для работы.\n*Доступные команды:*\n`;
    helpText += COMMANDS.map(
      (command) => `*/${command.command}* ${command.description}`
    ).join(`\n`);
    return ctx.reply(helpText);
});

bot.command("whoami", (ctx) => {
    const { id, username, first_name, last_name } = ctx.from;
    return ctx.replyWithMarkdown(`Кто ты по жизни:
*id* : ${id}
*username* : ${username}
*Имя* : ${first_name}
*Фамилия* : ${last_name}
*chatId* : ${ctx.chat.id}`);
});

// bot.command("audio", (ctx) => {
//     return ctx.replyWithAudio({ source: "./kai.m4a" });
// });

bot.command("photo", async (ctx) => {
    const chatId = ctx.message.chat.id;
    // Получение аргументов
    const { args = "" } = ctx.state.command;
    const whatAnimal = args;
    // Пользователь, не скучай, я начал работу
    ctx.telegram.sendMessage(chatId, "Ищу фото ...");
    // Запрос урла картинки
    const url = await randomAnimal(whatAnimal);
    // Предусмотрительно защититься от null, который может внезапно прийти из апи (увы, да)
    if (!url) {
        return ctx.reply("Поиск фото не удался");
    }
    // А это что- gif, что ли пришёл, да?
    const extension = url.split(".").pop();
    if (extension.toLowerCase() === "gif") {
        // Если gif, значит оформить анимешку
        return telegram.sendAnimation(chatId, url);
    }
    return ctx.telegram.sendPhoto(chatId, url);
});

bot.command("group", async (ctx) => {
    const catUrl = await randomAnimal("cat");
    const dogUrl = await randomAnimal("dog");
    const foxUrl = await randomAnimal("fox");
    return ctx.replyWithMediaGroup([
        { type: "photo", media: catUrl, caption: "Мяу" },
        { type: "photo", media: dogUrl, caption: "Гав" },
        { type: "photo", media: foxUrl, caption: "Тяф" },
    ]);
});

/*
bot.command("photo", async (ctx) => {
    // const response = await fetch("https://aws.random.cat/meow");
    // const data = await response.json();
    // console.log(data.file)
    // return ctx.replyWithPhoto({source: "./1.jpg"});
    return ctx.replyWithPhoto('https://kai.ru/image/journal/article?img_id=6165643&t=1499089609925');
});*/

bot.hears('hi', ctx => {
    return ctx.reply(`Welcome`, {
        reply_markup: {
            keyboard: [["1", "2", "3"], ["4", "5"]],
            one_time_keyboard: true,

        },
    })
    return ctx.reply('Hey there');
});

bot.hears('Музей КАИ', ctx => {
    ctx.replyWithPhoto('https://kai.ru/documents/10181/5713272/museum01.jpg/deb4bb9c-167d-42fe-a3ce-733ec2f0fa4f?t=1484812627735')
    ctx.reply('Экспозиция музея посвящена истории вуза. Большой ее раздел отведен истории создания и становления института, центральную часть которого составляет уголок организатора КАИ – чл. - корр. АН СССР, лауреата Ленинской премии Четаева Николая Гурьевича. В экспозиции отражена история создания и развития всех факультетов, первой в вузах страны кафедры реактивных двигателей.\nВажная часть экспозиции посвящена сегодняшнему периоду жизни и деятельности вуза в статусе национального исследовательского технического университета. Наряду с учебной и научной работой в музее широко представлены материалы об общественной жизни коллектива, студенчества: о деятельности студенческих конструкторских бюро и строительных отрядов, о достижениях в спорте и художественном творчестве.\nОдин из разделов экспозиции посвящен выпускникам КАИ – КНИТУ. Среди них – генеральный конструктор ОКБ Сухого – М.П. Симонов, главный конструктор ракетно – космической системы «Энергия – Буран» - Б.И. Губанов, первый премьер – министр России – И.С. Силаев, а также Герои Советского Союза и России, Герои Социалистического Труда, директора предприятий, заслуженные летчики – испытатели СССР, РФ и др.')
    return
    // return ctx.reply()
})

bot.hears('Видео', ctx => {
    return ctx.reply('Музей КНИТУ-КАИ\nhttps://youtu.be/pI4MkJK6cNI')
})

bot.hears('Направления', ctx => {
    return ctx.reply(`
    Основные направления деятельности музея:
    - организация учебных экскурсий для первокурсников по истории университета, о жизни и деятельности А. Н. Туполева;
    - организация экскурсий по экспозиции музея и выставкам на его базе для студентов, сотрудников и гостей университета;
    - профориентационная работа со школьниками: экскурсии по истории университета и факультетов для старшеклассников, консультации для абитуриентов и их родителей;
    - организация тематических выставок, посвященных юбилеям подразделений, выдающихся ученых;
    - подбор материалов и методическая помощь в организации выставок для институтов, факультетов и кафедр`)
})

bot.hears("Аудио", (ctx) => {
    return ctx.replyWithAudio({ source: "./kai.m4a" });
});

bot.hears('Фото', ctx => {
    return ctx.replyWithMediaGroup([
        { type: "photo", media: 'https://kai.ru/documents/10181/5713272/museum07.jpg/d83af8f9-960e-4d3b-b3db-ba6a1320a24f?t=1484812979597'},
        { type: "photo", media: 'https://kai.ru/documents/10181/6074531/DSC_1045.jpg/542d44b6-fc15-45de-9f49-bdee8420d523?t=1572245850600'},
        { type: "photo", media: 'https://kai.ru/documents/131969/11905452/%D0%9A+75-%D0%BB%D0%B5%D1%82%D0%B8%D1%8E+%D0%9F%D0%BE%D0%B1%D0%B5%D0%B4%D1%8B.jpg/9d3fdde6-3594-4e46-8008-f6688a86d0ec?t=1610696474577'},
    ]);
})

bot.on("text", (ctx) => {
    console.log(ctx)
    console.log('\n\n' + ctx.message.text)
    return ctx.reply('Ай донт андерстенд!');
});

bot.launch();

console.log('KaiBot запущен!');