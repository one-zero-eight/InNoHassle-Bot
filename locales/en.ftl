-bug =
    - - -
    If you see this text, you just encountered a bug. Please, report this to the developers via the Support section.
    Bug ID:

-url =
    .innohassle = https://innohassle.ru/
    .one-zero-eight-telegram = https://t.me/one_zero_eight

-emoji =
    .check-mark-button = ✅
    .flag-united-states = 🇺🇸
    .flexed-biceps = 💪
    .gear = ⚙️
    .globe-with-meridians = 🌐
    .left-arrow = ⬅️
    .money-with-wings = 💸
    .no-entry = ⛔️
    .no-mobile-phones = 📵
    .ok-hand = 👌
    .open-book = 📖
    .right-arrow = ➡️
    .speech-balloon = 💬
    .tear-off-calendar = 📆
    .white-question-mark = ❔
    .writing-hand = ✍️

button =
    .start--yes = { -emoji.ok-hand } OK
    .start--have-account--yes = { -emoji.check-mark-button } Of course!
    .start--have-account--no = { -emoji.white-question-mark } Huh?..
    .start--connect-telegram--yes = { -emoji.check-mark-button } For sure!
    .start--connect-telegram--no = { -emoji.no-entry } No way!
    .start--create-account--yes = { -emoji.check-mark-button } Done
    .start--create-account--no = { -emoji.right-arrow } Not now
    .start--schedules--yes = { -emoji.check-mark-button } Sure thing!
    .start--schedules--no = { -emoji.right-arrow } Maybe, later…
    .main-menu--settings = { -emoji.gear } Settings
    .main-menu--schedules = { -emoji.tear-off-calendar } Schedules
    .main-menu--information = { -emoji.open-book } Information
    .main-menu--scholarship = { -emoji.money-with-wings } Scholarship
    .main-menu--sport = { -emoji.flexed-biceps } Sport
    .main-menu--support = { -emoji.speech-balloon } Support
    .back-to-main-menu = { -emoji.left-arrow } Back
    .back-to-scholarship = { button.back-to-main-menu }
    .back-to-settings = { button.back-to-main-menu }
    .scholarship--select-course = { -emoji.writing-hand } Select course
    .settings--link-account = { -emoji.globe-with-meridians } Link account
    .settings--unlink-account = { -emoji.no-mobile-phones } Unlink account

course--b22-plus = B22+
course--b23 = B23

start =
    Hello! I’m the <a href="{ -url.innohassle }">InNoHassle</a> bot created by <a href="{ -url.one-zero-eight-telegram }">one-zero-eight</a>.

    As for now, I can:
    • calculate your scholarship;
    • notify you about upcoming events;
    • provide you with information about the university staff.

    Before we get started, let’s set some things up?

start--have-account = Do you have an <a href="{ -url.innohassle }">InNoHassle</a> account already?

start--connect-telegram = Perfect! Then would you like to connect your Telegram account to InNoHassle?

start--create-account =
    Oh, I see. Then I highly recommend creating one, so you can keep your data synced with the website.

    To create an account, proceed to <a href="{ -url.innohassle }">innohassle.ru</a> and press “<i>Sign in</i>”.

start--schedules = Would you like to get notifications on some schedules?

default = What are we up to now?

schedules = [schedules Schedules]

scholarship--request =
    <b>{ button.main-menu--scholarship }</b> for the { $course } course.

    { $error ->
        [0] Please, send your grades separated by space. Example:
        [1] <b><u>Please, send your true grades separated by space. Example:</u></b>
        *[other] { -bug } scholarship--request
    }
    <blockquote>B A A B C B P</blockquote>

scholarship--response =
    <b>{ button.main-menu--scholarship }</b> for the { $course } course.

    GPA: { $gpa }.

    <b>{ $scholarship } RUB.</b>

scholarship--select-course = <b>{ button.scholarship--select-course }:</b>

information = [information Information]

settings =
    <b>{ button.main-menu--settings }</b>

    <b>{ -emoji.flag-united-states } Language:</b> English
    { $innohassleLinked ->
        [0] { -emoji.globe-with-meridians } <b>InNoHassle account:</b> not linked
        [1] { -emoji.globe-with-meridians } <b>InNoHassle account:</b> { $fullName }
        *[other] { -bug } settings
    }

sport = [sport Sport]

support = [support Support]
