# Proyecto De PQRS


## Iniciar el Back-End

Para iniciar el Back-End deben tener:

1. **Configurada la base de datos en MySQL llamada `PQRS`**
2. **Crear un usuario llamado `root` con contraseña `Osoted12.`, ya lo adaptan a el su su servidor en el aplicattion.yml**
3. **Tener más de `2GB` de RAM disponibles para un buen funcionamiento**

---

## Iniciar el Front-End

Para iniciar el Front-End deben hacer lo siguiente:

1. Ejecutar las siguientes líneas para instalar las librerías necesarias:

    ```sh
    npm install react-icons --save
    npm i react-router-dom
    npm i react-data-table-component
    npm i axios
    ```
---

## Confihuraciopn de Mail Sender

Para configurar Mail Sender debemos hacer lo siguiente tome en cuenta que lo 3 primeros pason son con gmail, si tiene otro servicio de internet como yahoo o outlock por ejemplo tendria que buscar como hacerlos: 

1. Primero debemos entar a Administar tu Cuenta de Google del correo 
![alt text](<Imagen de WhatsApp 2024-06-21 a las 14.13.49_d1e87d3e.jpg>)

2. Una vez dentro en el buscador colocamos Contraseña de aplicaciones
![alt text](<Imagen de WhatsApp 2024-06-21 a las 14.15.05_c4c4436b.jpg>)

3. Dentro de Contraseña de aplicaciones les va a pedir que coleque su contraseña para confirmacion y le abrira uan pestaña donde les va a un nombre para la aplicacion y depues que le coloquen el nombre, y le den crear les saldra la contraseña misma que se colocara en la configuracion de Mail Sender

![alt text](<Imagen de WhatsApp 2024-06-21 a las 14.16.09_6f1a761d.jpg>)

![alt text](<Imagen de WhatsApp 2024-06-21 a las 14.16.29_b049bae4.jpg>)

4. En su editor de confianza en la carpeta config buscamos el archivo MailConfiguration 

    1. Donde dice mailSender.setHost se deja de esa manera si va a trabajar con gmail si no investigue el host de su servicio

    2. Lo demas se deja asi y nos centramos en estas 2 lineas 

        mailSender.setUsername("example@gmail.com");
        mailSender.setPassword("Password");
      
      Alli debe colocar el correo con el que se va a enviar los mensajes en setUsername y la contraseña que genero en pasos anteriores een setPasword   

      3. si usa otro servicio de correo electronico debe cambiar las propiedades de acuerdo a su servicio  

![alt text](image.png)

