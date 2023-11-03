const book1 = {
  title: "Harry Potter and the Philosopher's Stone ",
  description:
    "Harry Potter has never even heard of Hogwarts when the letters start dropping on the doormat at number four, Privet Drive. Addressed in green ink on yellowish parchment with a purple seal, they are swiftly confiscated by his grisly aunt and uncle. Then, on Harrys eleventh birthday, a great beetle-eyed giant of a man called Rubeus Hagrid bursts in with some astonishing news: Harry Potter is a wizard, and he has a place at Hogwarts School of Witchcraft and Wizardry",
  author: "J.K. Rowling",
};

const book2 = {
  title: "Тихий Дон (комплект из 2-х книг) ",
  description:
    "Словно сама жизнь говорит со страниц «Тихого Дона». Запахи степи, свежесть вольного ветра, зной и стужа, живая речь людей — все это сливается в раздольную, неповторимую мелодию, поражающую трагической красотой и подлинностью. Разве можно забыть мятущегося в поисках правды Григория Мелехова? Его мучительный путь в пламени Гражданской войны, его пронзительную, неизбывную любовь к Аксинье, все изломы этой тяжелой и такой прекрасной судьбы? Великий роман Михаила Шолохова — в комплекте из двух книг.",
  author: "Михаил Шолохов",
};

const book3 = {
  title: "Чистый код: создание, анализ и рефакторинг",
  description:
    "Даже плохой программный код может работать. Однако если код не является «чистым», это всегда будет мешать развитию проекта и компании-разработчика, отнимая значительные ресурсы на его поддержку и «укрощение». Эта книга посвящена хорошему программированию. Она полна реальных примеров кода. Мы будем рассматривать код с различных направлений: сверху вниз, снизу вверх и даже изнутри. Прочитав книгу, вы узнаете много нового о коде. Более того, вы научитесь отличать хороший код от плохого. Вы узнаете, как писать хороший код и как преобразовать плохой код в хороший. Книга состоит из трех частей. В первой части излагаются принципы, паттерны и приемы написания чистого кода; приводится большой объем примеров кода. Вторая часть состоит из практических сценариев нарастающей сложности. Каждый сценарий представляет собой упражнение по чистке кода или преобразованию проблемного кода в код с меньшим количеством проблем. Третья часть книги — концентрированное выражение ее сути. Она состоит из одной главы с перечнем эвристических правил и «запахов кода», собранных во время анализа. Эта часть представляет собой базу знаний, описывающую наш путь мышления в процессе чтения, написания и чистки кода.",
  author: "Роберт Мартин",
};

describe("Favorite book spec", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.login("bropet@mail.ru", "123");
  });

  it("Should add new book", () => {
    cy.addBook(book1);
    cy.get(".card-title").should("contain.text", book1.title);
  });

  it("Should add new book to favorite", () => {
    cy.addFavoriteBook(book2);
    cy.visit("/favorites");
    cy.get(".card-title").should("contain.text", book2.title);
  });

  it("Should add book to favorite through 'Book list' page", () => {
    cy.addBookNoFavorite(book1);
    cy.contains(book1.title)
      .should("be.visible")
      .within(() => cy.get(".card-footer > .btn").click({ force: true }));
    cy.visit("/favorites");
    cy.contains(book1.title).should("be.visible");
  });

  it("Should delete book from favorite", () => {
    cy.visit("/favorites");
    cy.contains(book2.title)
      .should("be.visible")
      .within(() => cy.get(".card-footer > .btn").click({ force: true }));
    cy.contains(book2.title).should("not.exist");
  });
});
