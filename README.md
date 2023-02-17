ЭНДПОИНТЫ :
    Без хеширования данных:
        countries:
            Функционал: Получение всех стран, которые включены в кинопремьеры.
            Методы: GET
            Пример: http://localhost:3001/countries
        genres:
            функционал: Получение всех жанров, которые включены в кинопремьеры.
            Методы: GET
            Пример: http://localhost:3001/genres
        movies:
            функционал: 
                Пагинациия,
                Сортировка,
                Поиск фильмов по названию,
                Фильтрация по Countries и Genres (Можем выбрать один или несколько фильтров для получения фильмов).
            Методы: GET
            Query-параметры: 
                take,
                skip,
                keyword,
                sort,
                countries,
                genres.
            Пример: http://localhost:3001/movies?take=5&skip=1&keyword=а&sort=ASC&countries=1,2&genres=9
    C хешированием данных:
        pagination:
            Функционал: Получение кинопромьер с пагинацией
            Методы: GET
            Query-параметры: 
                take,
                skip
            Пример: http://localhost:3001/pagination?take=1&skip=1
        sort: 
            Функционал: Получение кинопромьер с сортировкой по  названиям(ru)
            Методы: GET
            Query-параметры:
                sort
            Значения sort: 
                ASC,
                asc,
                DESC,
                desc    
            Пример: http://localhost:3001/sort?sort=ASC
        search: 
            Функционал: Поиск фильмов по названию(ru)
            Методы: GET
            Query-параметры:
                keyword
            Пример: http://localhost:3001/search?keyword=душа
        filtr: 
            Функционал: Поиск фильмов по фильтрам(жанры и страны)
            Методы: GET
            Query-параметры:
                countries,
                genres
            Пример: http://localhost:3001/filtr?genres=1,3,15&countries=1,3





         
         
        