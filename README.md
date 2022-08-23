# Pu'Er Tea Co.

An e-commerce site for a demo tea shop, built with Typescript and React.

Viewable at https://xiejon.github.io/shopping_cart/

![demo](./src/resources/images/readme.mov)

## Objectives 

1. Create an e-commerce site using Typescript & React.
2. Allow user to add & delete items in a shopping cart.
3. Handle browser routing with 'react-router-dom'. 
4. Pass data to children components using React Context.
5. Use CSS modules to improve code organization and reduce naming conflicts.

## Challenges 

1. Typescript
    - This was my first project using Typescript. I learnt as I went, googling and reading documentation when I ran into issues. I was motivated to learn Typescript after reading about the advantages of (optional) static typing, type inference, and IntelliSense. Though I at first felt restricted by these new rules, I soon realized that writing code in Typescript helps me develop better habits, which will hopefully carry over into my work on bigger projects. 

2. React Context
    - I needed a way to pass shopping cart data (such as item id, quantity, and CRUD methods) far down the component hierarchy. Though I could have stored state in my main App file and then passed it to its children as props, I felt that this was an unideal solution. It meant that various unrelated components along the way would have to also receive the shopping cart state. I briefly looked into Redux as a solution for this, but I ultimately settled on React Context. 

## Areas for Improvement

- Full payment functionality. Though this was beyond the scope of this project, I am keen to explore how to integrate payment processing into the website. 