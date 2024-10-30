1 crear proyecto
    nest new nombre_proyecto
2 instalar dependencias(opcional)
    cd nombre_proyecto
    npm install
3 correr el proyecto
    npm run start:dev (ok)

4 crear repositorio en github
5 vincular proyecto con repositorio de github
    git remote add origin https://github.com/username/nombre_proyecto.git
    git push -u origin master

6 configurar el proyecto
    - habilitar swagger
    - habilitar linter (preformateo)
    - configModule
     creando el archivo .env
7 correr el proyecto
    corregir sino corre el proyecto

8 crear un modulo
    - estudiantes (manual)
        - .module.ts
        - .service.ts
        - .controller.ts
    - (automatico) utilizando comando de nestjs
     nest g module nombre_modulo
     nest g s nombre_service
     nest g co nombre_controller
    
    agregar el modulo al archivo app.module.ts

9