# React + Vite para inicializar el proyecto

Bibliotecas externas a react utilizadas:

axios - Para las consultas a la API de RAWG.
useDebounce de @uidotdev/useHooks - Para poner delay en la barra de búsqueda y no realizar consultas a la api letra por letra.
react-router-dom - Para realizar las rutas de las 2 páginas de la app Home y gamePage.


Observaciones:

El parámetro "search" de la api no realiza las comparaciones con el nombre de los juegos automaticamente, y para no realizar tantas consultas a la api, ya que tienen un limite mensual que entre pruebas y pruebas se pierden demasiadas, preferí dejarlo como funciona desde la API.
