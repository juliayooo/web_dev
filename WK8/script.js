script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js";
script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js";
        
        const necklace = document.querySelector('.necklace');
        const india1 = document.querySelector('.india1');
        const india2 = document.querySelector('.india2');
        const indiaquad = document.querySelector('.indiaquad');
        const avo = document.querySelector('.avo');
        const duo = document.querySelector('.duo');

        let xval = 0;
        let rotation = 0;
        gsap.registerPlugin(ScrollTrigger);

        let tl = gsap.timeline();
        tl.to(necklace, { 
            transformOrigin: "center center",
            scale: 10, 
            scrollTrigger: {
                trigger: necklace,
                start: "top 70%",
                scrub: true,
                markers: true,
              },
              
        })
        console.log("triggered");
        ;