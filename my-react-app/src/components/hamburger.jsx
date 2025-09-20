import "./styles.css";

const btn = document.getElementById('menu-btn')
btn.addEventListener('click' , hamburgerLogic)
export default hamburgerLogic()
{
   btn.classList.toggle('open')
}