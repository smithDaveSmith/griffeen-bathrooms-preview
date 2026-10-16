(()=>{
'use strict';
const previewAssetBase=new URL('.',document.currentScript?.src||new URL('assets/site.js',document.baseURI));
const qs=(s,root=document)=>root.querySelector(s),qsa=(s,root=document)=>[...root.querySelectorAll(s)];
// Core page content is already present in the HTML. Enhancements are optional.
const menu=qs('.menu');
if(menu){menu.addEventListener('keydown',event=>{if(event.key==='Escape'){menu.open=false;qs('summary',menu).focus();}});document.addEventListener('click',event=>{if(menu.open&&!menu.contains(event.target))menu.open=false;});}
const filter=qs('#location-filter');
if(filter){filter.addEventListener('change',()=>{let count=0,albums=0;qsa('.album').forEach(album=>{const show=filter.value==='all'||album.dataset.location===filter.value;album.hidden=!show;if(show){count+=qsa('figure',album).length;albums++;}});qs('#gallery-count').textContent=`${count} photographs · ${albums} projects`;});}
const dialog=qs('.lightbox');
if(dialog&&typeof dialog.showModal==='function'){
 let active=0,lastFocus=null;
 const links=qsa('.gallery-image');
 const visibleLinks=()=>links.filter(a=>!a.closest('.album').hidden);
 const showPhoto=(index)=>{const available=visibleLinks();active=(index+available.length)%available.length;const a=available[active],img=qs('#lightbox-img');img.src=a.href;img.alt=a.dataset.caption;qs('#lightbox-title').textContent=a.dataset.title;qs('#lightbox-caption').textContent=a.dataset.caption;qs('#photo-position').textContent=`${active+1} / ${available.length}`;};
 links.forEach(a=>a.addEventListener('click',event=>{event.preventDefault();lastFocus=a;showPhoto(visibleLinks().indexOf(a));dialog.showModal();}));
 qs('#lightbox-close').addEventListener('click',()=>dialog.close());
 qs('#photo-next').addEventListener('click',()=>showPhoto(active+1));qs('#photo-prev').addEventListener('click',()=>showPhoto(active-1));
 dialog.addEventListener('keydown',event=>{if(event.key==='Tab'){const focusable=[...dialog.querySelectorAll('button,a[href],input,textarea,select')].filter(el=>!el.disabled&&el.getClientRects().length);const first=focusable[0],last=focusable[focusable.length-1];if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}}if(event.key==='ArrowRight'){event.preventDefault();showPhoto(active+1);}if(event.key==='ArrowLeft'){event.preventDefault();showPhoto(active-1);}});
 dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});
 dialog.addEventListener('close',()=>lastFocus?.focus());
}
const form=qs('#enquiry-form');
if(form){
 form.addEventListener('submit',event=>event.preventDefault());
 qs('#prepare-enquiry').addEventListener('click',()=>{
  if(!form.reportValidity())return;
  const values=Object.fromEntries(new FormData(form));
  const text=`Hello Griffeen Bathrooms,\n\nI would like to discuss a bathroom renovation.\n\nName: ${values.name.trim()}\nEmail: ${values.email.trim()}\nPhone: ${values.phone.trim()||'Not provided'}\nProperty location: ${values.location.trim()}\n\nAbout my bathroom:\n${values.project.trim()}\n\nPlease let me know the next step.\n\nThank you,\n${values.name.trim()}`;
  qs('#enquiry-draft').value=text;qs('#open-email').href=`mailto:info@griffeenbathrooms.ie?subject=${encodeURIComponent('Bathroom renovation enquiry — '+values.location.trim())}&body=${encodeURIComponent(text)}`;
  qs('#draft-panel').hidden=false;qs('#form-status').textContent='Your draft is ready below. No enquiry has been sent.';qs('#enquiry-draft').focus();
 });
 qs('#copy-draft').addEventListener('click',async()=>{try{await navigator.clipboard.writeText(qs('#enquiry-draft').value);qs('#form-status').textContent='Draft copied. Paste it into your email app to send.';}catch{qs('#enquiry-draft').focus();qs('#enquiry-draft').select();qs('#form-status').textContent='Select and copy the draft below. It has not been sent.';}});
}
// All motion belongs to one matchMedia context and one easing curve.
const stage=qs('.drawing-stage'),controls=qsa('[data-drawing]'),experience=qs('.plan-experience');
const projects={lucan:{src:new URL('project-07.webp',previewAssetBase).href,name:'Victoria, Lucan',description:'Warm wood. Cream surfaces. A walk-in shower.',alt:'Bathroom with walk-in shower, double wall-hung vanity and cream tiles'},dundrum:{src:new URL('project-12.webp',previewAssetBase).href,name:'Aoife, Dundrum',description:'A freestanding bath. White subway tiles. Traditional character.',alt:'Traditional Dundrum bathroom with freestanding bath and white subway tiles'},wicklow:{src:new URL('project-05.webp',previewAssetBase).href,name:'Garry, Wicklow',description:'Stone tones. Wall-mounted taps. A floating vanity.',alt:'Wicklow bathroom with grey tiles, black wall-mounted taps and vanity'}};
function setStaticView(view){if(!stage)return;stage.dataset.view=view;controls.forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.drawing===view)));qsa('[data-chapter]').forEach((el,i)=>el.dataset.active=String(i===(view==='drawing'?0:2)));}
function setProject(key){const p=projects[key],img=qs('#project-view img');if(!p||!img)return;img.src=p.src;img.alt=p.alt;qs('#project-name').textContent=p.name;qs('#project-description').textContent=p.description;qsa('[data-project]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.project===key)));}
function staticEnhancements(){const handlers=[];controls.forEach(b=>{const fn=()=>setStaticView(b.dataset.drawing);b.addEventListener('click',fn);handlers.push([b,fn]);});qsa('[data-project]').forEach(b=>{const fn=()=>setProject(b.dataset.project);b.addEventListener('click',fn);handlers.push([b,fn]);});return()=>handlers.forEach(([b,fn])=>b.removeEventListener('click',fn));}
if(!window.gsap){staticEnhancements();return;}
if(window.ScrollTrigger)gsap.registerPlugin(ScrollTrigger);
const mm=gsap.matchMedia(),forcedReduced=new URLSearchParams(location.search).get('motion')==='off';
mm.add({desktop:'(min-width: 1000px) and (min-height: 820px)',mobile:'(max-width: 999px), (max-height: 819px)',reduce:'(prefers-reduced-motion: reduce)'},context=>{
 const ease='power2.inOut',reduce=context.conditions.reduce||forcedReduced,handlers=[];let comparison,projectTween,story,storyTrigger;
 if(reduce){setStaticView('room');return staticEnhancements();}
 if(qs('.mirror-hero')){
  const opening=gsap.timeline({defaults:{ease}});
  opening.fromTo('.title-piece',{yPercent:105},{yPercent:0,duration:.95,stagger:.12},0).fromTo('.portal-image',{clipPath:'inset(10% 8% 10% 8% round 200px)',scale:.86},{clipPath:'inset(0% 0% 0% 0% round 200px)',scale:1,duration:1.2},.1).fromTo('.portal-ring',{scale:.88},{scale:1,duration:1.2},.1);
  if(window.ScrollTrigger)gsap.to('.hero-portal',{y:-55,scale:1.08,ease,scrollTrigger:{trigger:'.mirror-hero',start:'top top',end:'bottom top',scrub:true}});
 }
 const activate=progress=>{const chapter=progress<.35?0:progress<.7?1:2;qsa('[data-chapter]').forEach((el,i)=>el.dataset.active=String(i===chapter));controls.forEach(b=>b.setAttribute('aria-pressed',String((chapter===2&&b.dataset.drawing==='room')||(chapter===0&&b.dataset.drawing==='drawing'))));};
 if(stage&&experience&&window.ScrollTrigger&&context.conditions.desktop){
  experience.classList.add('is-animated');stage.dataset.view='room';
  story=gsap.timeline({defaults:{ease},paused:true});
  story.fromTo('.drawing-photo',{opacity:0,clipPath:'circle(0% at 70% 36%)'},{opacity:1,clipPath:'circle(100% at 70% 36%)',duration:.45},.55)
   .fromTo('.detail-window',{opacity:0,scale:.4},{opacity:1,scale:1,duration:.22},.26)
   .to('.detail-window',{opacity:0,scale:1.22,duration:.2},.64)
   .fromTo('.plan-progress i',{scaleX:0},{scaleX:1,duration:1,ease},0);
  storyTrigger=ScrollTrigger.create({id:'griffeen-room-story',trigger:'.plan-pin',start:'top top',end:()=>'+='+Math.round(innerHeight*1.7),animation:story,pin:true,scrub:true,invalidateOnRefresh:true,onUpdate:self=>activate(self.progress)});
  activate(storyTrigger.progress);
 }else setStaticView('room');
 controls.forEach(button=>{const fn=()=>{
  if(!stage)return;comparison?.kill();const room=button.dataset.drawing==='room';
  if(storyTrigger&&scrollY>=storyTrigger.start-1&&scrollY<=storyTrigger.end+1){const progress=room?.999:.001;storyTrigger.scroll(storyTrigger.start+(storyTrigger.end-storyTrigger.start)*progress);story.progress(progress);activate(progress);}
  else{stage.dataset.view='room';controls.forEach(b=>b.setAttribute('aria-pressed',String(b===button)));comparison=gsap.to('.drawing-photo',{opacity:room?1:0,clipPath:'circle(100% at 70% 36%)',duration:.6,ease});qsa('[data-chapter]').forEach((el,i)=>el.dataset.active=String(i===(room?2:0)));}
 };button.addEventListener('click',fn);handlers.push([button,fn]);});
 qsa('[data-project]').forEach(button=>{const fn=()=>{const img=qs('#project-view img');if(!img||button.getAttribute('aria-pressed')==='true')return;projectTween?.kill();projectTween=gsap.timeline({defaults:{ease}}).to(img,{xPercent:-9,opacity:0,duration:.22}).add(()=>setProject(button.dataset.project)).fromTo(img,{xPercent:9},{xPercent:0,opacity:1,duration:.45});};button.addEventListener('click',fn);handlers.push([button,fn]);});
 return()=>{comparison?.kill();projectTween?.kill();storyTrigger?.kill(true);story?.kill();handlers.forEach(([b,fn])=>b.removeEventListener('click',fn));experience?.classList.remove('is-animated');setStaticView('room');};
});
window.addEventListener('pagehide',()=>mm.revert(),{once:true});
})();
