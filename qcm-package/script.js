class QCM {
    constructor(cssHref, struct) {
        this.struct = struct;
        this.cssHref = cssHref;

        this.init();
        this.create();
        this.updateHTMLElement();
    }

    init() {
        this.all_result = [];
        this.questionIdx = 0;
        this.first = true;
        this.isEnd = false;

        let body = document.querySelector("body");
        let header = document.querySelector("head");

        let cssLink = document.createElement("link");
            cssLink.rel = "stylesheet";
            cssLink.href = this.cssHref;
        header.appendChild(cssLink);

        let box = document.createElement("div");
            box.id = "box";
        
            let title = document.createElement("div");
                title.id = "head";
                box.appendChild(title);
            
            let all_btn = document.createElement("ul");
                let btn1 = document.createElement("li");
                    let btn1_text = document.createElement("span");
                        btn1_text.className = "choices";
                    btn1.appendChild(btn1_text);
                all_btn.appendChild(btn1);

                let btn2 = document.createElement("li");
                    let btn2_text = document.createElement("span");
                        btn2_text.className = "choices";
                    btn2.appendChild(btn2_text);
                all_btn.appendChild(btn2);

                let btn3 = document.createElement("li");
                    let btn3_text = document.createElement("span");
                        btn3_text.className = "choices";
                    btn3.appendChild(btn3_text);
                all_btn.appendChild(btn3);

                let btn4 = document.createElement("li");
                    let btn4_text = document.createElement("span");
                        btn4_text.className = "choices";
                    btn4.appendChild(btn4_text);
                all_btn.appendChild(btn4);

                box.appendChild(all_btn);
            body.appendChild(box);
        this.all_btn = document.querySelectorAll("#box ul li");
        this.all_btn_text = document.querySelectorAll("#box ul li span")
        this.box = document.getElementById("box");
        this.title = document.getElementById("head");
    }

    create() {
        let idx = 0;
        let timeClick = true;

        setInterval(() => {
            timeClick = true;
        }, 2000);

        for (let btn of this.all_btn) {
            btn.addEventListener("click", () => {
                if (timeClick && !this.isEnd) {
                    this.all_result.push(btn.innerHTML.split("<").join(">").split(">")[2]);
                    this.updateHTMLElement();
                    this.questionIdx++;
                    timeClick = false;
                }
            });

            idx++;
        }
    }

    updateHTMLElement() {
        this.box.className = "fadeOutAnim";
    
        this.box.addEventListener("animationend", () => {
            if (this.first) {
                for (let btn of this.all_btn) {
                    btn.style.display = "block";
                }
                this.first = false;
            }
    
            // change form properties   
            if (this.questionIdx <= Object.keys(this.struct).length-1) {
                let questionTtile = Object.keys(this.struct)[this.questionIdx];
                this.title.innerText = questionTtile;
    
                let i = 0;
    
                for (let btn of this.all_btn_text) {
                    btn.innerText = this.struct[questionTtile][i].split(":")[0]
                    i++;
                }
    
                this.box.className = "fadeInAnim";
            }
    
            else {
                if (!this.isEnd) {
                    this.isEnd = true;
                    let goodCount = 0;
    
                    for (let result of this.all_result) {
                        for (let choices of Object.values(this.struct)) {
                            for (let choice of choices) {
                                let splitChoice = choice.split(":");
                                if (splitChoice[1] === "good" && splitChoice[0] === result) {
                                    goodCount++;
                                }
                            }
                        }
                    }
    
                    this.title.innerText = goodCount.toString() + " / " + this.all_result.length;
    
                    for (let btn of this.all_btn) {
                        btn.style.display = "none";
                    }
    
                    this.box.className = "fadeInAnim";
                }
            }
        });
    }
}
