# TASK :

Необходимо создать проект сервера, использующий NestJS + TypeScript
  - обеспечить доступ нескольких пользователей. производительность не важна
  - сервер подразумевает работу с PostgreSQL. разработка самой БД не требуется
  - при этом стараться максимально покрыть код комментариями

Проект должен включать следующий функционал:

= модуль авторизации:
  - авторизация в системе с использованием разных ролей
  - для обеспечения этого иметь таблицу users в базе с данными в виде:
    - логин/mail
    - пароль
    - ...

= модуль профиля:
  - регистрация в системе - создание пользователя + его профиля
  - получение, изменение и удаление профиля
  - для работы с профилем иметь таблицу profiles в базе с данными в виде:
    - ФИО
    - тел.
    - ...

- записи таблиц users и profiles связаны 1 к 1
  выделение таблицы users необходимо для независимости её структуры от данных профиля
- для редактирования и удаления профилей поставить проверку прав - доступно себе или админу

= модуль "текстовый блок"
  - для работы с блоками сайта иметь таблицу в базе, хранящую данные различных элементов сайта в виде:
    - уникальное наименование блока
    - наименование группы блока
    - заголовок
    - текст
    - картинка
  - все поля таблицы в БД могут быть нулевыми, если в блоке на сайте подобная информация не требуется
  - добавление, получение, редактирование, удаление текстовых блоков
    - доступно только админу
  - при получении списка среди прочего должна быть возможность фильтрации блоков по группам

- модуль "текстовый блок" необходим для гибкости корректирования данных на сайте без вмешательства в .html-файлы

= модуль файлов
  - файлы можно не хранить непосредственно в БД, а только пути к ним
  - для работы с файлами иметь таблицу в базе, хранящую данные о файлах в виде:
    - дата добавления в систему (createdAt)
    - таблица, где используется (essenceTable) - profile \ "текстовый блок"
    - id, где используется (essenceId) - id записи в сущности
  - добавление, получение, изменение и удаления файлов из системы
  - сделать таймер, проверяющий и стирающий ежечасно файлы, не имеющие связи с записями таблиц

- модуль файлов может использоваться в следующей ситуации:
  во время заполнения формы пользователь добавляет файлы
  и они сразу загружаются в систему, чтобы был к ним доступ из общего функционала
  но если заполнение формы не было завершено, файл не получает привязки к записи какой-либо таблицы и будет стёрт через время

- учитывая использование в модуле "текстовый блок" картинок, то он должен также использовать модуль файлов для работы
  - информация о файле должна приходить с остальными данными текстового блока
  - при удалении блока не забыть убрать ссылки в записи о файле