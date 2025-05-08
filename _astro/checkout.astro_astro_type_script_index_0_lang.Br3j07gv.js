import{c as s}from"./cart.DfgZkCSH.js";const u=document.getElementById("cart-container"),p=document.getElementById("total-amount");function d(){const n=s.getItems();u.innerHTML=n.length?"":'<p class="text-center">Your cart is empty.</p>';let o=0;n.forEach(t=>{const e=document.createElement("div");e.className="flex flex-col md:flex-row justify-between items-center border p-4 rounded shadow gap-4";const a=t.image?`<img src="${t.image.src}" alt="${t.name}" class="w-20 h-20 object-cover rounded" />`:"";e.innerHTML=`
                    <div class="flex items-center gap-4">
                        ${a}
                        <div>
                            <p class="font-semibold">${t.name}</p>
                            <p class="text-sm text-gray-600">Quantity: ${t.quantity}</p>
                            <p class="text-sm text-gray-800">Price: $${(t.price*t.quantity).toFixed(2)}</p>
                        </div>
                    </div>
                    <button class="text-red-500 hover:text-red-700" data-id="${t.id}">Remove</button>
                `,e.querySelector("button").addEventListener("click",()=>{s.removeItem(t.id),d()}),u.appendChild(e),o+=t.price*t.quantity}),p.textContent=o.toFixed(2)}document.getElementById("checkout-form").addEventListener("submit",async n=>{n.preventDefault();const o=n.target,t=o.name.value,e=o.email.value,a={customer:{name:t,email:e},cart:s.getItems(),totalAmount:s.getItems().reduce((i,l)=>i+l.price*(l.quantity||1),0),currency:"usd",timestamp:new Date().toISOString()};console.log("Submitting payment payload:",a);const m=location.hostname==="localhost"?"http://localhost:8787":"https://cart-checkout-worker.greg-l-turnquist.workers.dev",r=await fetch(m,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(a)});if(!r.ok){const i=await r.text();console.error("Checkout failed:",r.status,i),alert("There was an error processing your payment.");return}const c=await r.json();c&&c.url?window.location.href=c.url:alert("There was an error processing your payment.")});document.addEventListener("DOMContentLoaded",d);window.addEventListener("cartUpdated",d);
