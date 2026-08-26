/* GUILDCODE - Intro Sequence */
class IntroSequence {
    constructor(onComplete) {
        this.onComplete = onComplete;
        this.screen = document.getElementById('screen-intro');
        this.rpgClasses = ['WARRIOR','MAGE','RANGER','PALADIN','ASSASSIN','CLERIC','BERSERKER','NECROMANCER','SORCERER','SHAMAN','HUNTER','MONK','DRUID','WARLOCK','CRUSADER','ALCHEMIST','ENCHANTER','BLADEMASTER','ELEMENTALIST','SUMMONER'];
        this.finalClass = 'CODEMANCER';
        this.subtitle = 'The Arcane Coder';
    }
    start() { this.screen.classList.add('active'); this.phase1_whiteFlash(); }
    phase1_whiteFlash() {
        var ov = document.createElement('div');
        ov.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;z-index:200;background:white;transition:opacity 0.3s ease;';
        this.screen.appendChild(ov);
        var self = this;
        setTimeout(function() { ov.style.opacity = '0'; setTimeout(function() { ov.remove(); self.phase1_crashText(); }, 300); }, 500);
    }
    phase1_crashText() {
        this.screen.style.background = '#000';
        var te = document.createElement('div');
        te.style.cssText = 'position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);text-align:center;max-width:500px;width:90%;padding:2rem;';
        this.screen.appendChild(te);
        var lines = [
            {t:'Voce esta cruzando a rua...',d:800},{t:'Quando um som agudo de pneu corta o ar.',d:800},
            {t:'',d:200},{t:'Um flash branco.',d:600},{t:'',d:100},
            {t:'Uma van branca. De repente. Sem aviso.',d:800},{t:'',d:200},
            {t:'Impacto.',d:600},{t:'',d:400},{t:'...',d:800},{t:'',d:200},
            {t:'Uma pena. Mas talvez...',d:800},{t:'sua habilidade seja necessaria',d:600},
            {t:'em um novo mundo.',d:800}
        ];
        var self = this; var i = 0;
        var showLine = function() {
            if (i >= lines.length) {
                setTimeout(function() { te.style.transition='opacity 0.5s'; te.style.opacity='0'; setTimeout(function(){te.remove();self.phase2_nameBox();},500); },600); return;
            }
            var ln = lines[i]; i++;
            if (ln.t === '') { setTimeout(showLine, ln.d); return; }
            var p = document.createElement('div');
            p.style.cssText = 'font-family:var(--font-ui);font-size:1rem;color:#c0c0c0;margin:0.5rem 0;opacity:0;transition:opacity 0.3s;line-height:1.5;';
            p.textContent = ln.t; te.appendChild(p);
            setTimeout(function(){p.style.opacity='1';},50);
            setTimeout(showLine, ln.d);
        };
        showLine();
    }
    phase2_nameBox() {
        var self = this;
        var bx = document.createElement('div');
        bx.style.cssText = 'position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:380px;max-width:90%;opacity:0;transition:opacity 0.4s;background:#0a0a14;border:1px solid rgba(139,92,246,0.3);z-index:10;';
        bx.innerHTML = '<div style="padding:0.4rem 0.8rem;border-bottom:1px solid rgba(139,92,246,0.15);background:#07070f;"><span style="font-family:var(--font-display);font-size:0.6rem;color:var(--text-dim);letter-spacing:0.15em;">NOTIFICACAO</span></div><div style="padding:1.5rem;"><div style="font-family:var(--font-ui);font-size:0.9rem;color:var(--text-secondary);margin-bottom:1rem;line-height:1.6;text-align:center;">O Sistema detectou uma presenca externa.<br>Identificacao necessaria para prosseguir.<br><span style="color:var(--text-dim);font-size:0.75rem;margin-top:0.5rem;display:block;">Digite seu nome para continuar:</span></div><input type="text" id="intro-name-input" placeholder="Seu nome..." style="width:100%;padding:0.6rem 0.8rem;background:#07070f;border:1px solid rgba(139,92,246,0.2);color:var(--text-primary);font-family:var(--font-ui);font-size:0.9rem;outline:none;text-align:center;" maxlength="20" /><button id="intro-confirm-name" style="width:100%;margin-top:0.8rem;padding:0.6rem;background:rgba(139,92,246,0.1);border:1px solid rgba(139,92,246,0.4);color:var(--purple-bright);font-family:var(--font-display);font-size:0.7rem;letter-spacing:0.15em;cursor:pointer;transition:all 0.2s;" disabled>CONFIRMAR</button></div>';
        this.screen.appendChild(bx);
        requestAnimationFrame(function(){bx.style.opacity='1';});
        var inp = document.getElementById('intro-name-input');
        var btn = document.getElementById('intro-confirm-name');
        inp.addEventListener('input', function(){btn.disabled=inp.value.trim().length===0;});
        inp.addEventListener('keydown', function(e){if(e.key==='Enter'&&inp.value.trim().length>0)btn.click();});
        btn.addEventListener('click', function(){
            if(inp.value.trim().length>0){self.playerNick=inp.value.trim();bx.style.opacity='0';setTimeout(function(){bx.remove();self.phase3_roulette();},400);}
        });
        setTimeout(function(){inp.focus();},400);
    }
    phase3_roulette() {
        var self = this;
        var bx = document.createElement('div');
        bx.style.cssText = 'position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:400px;max-width:90%;opacity:0;transition:opacity 0.4s;background:#0a0a14;border:1px solid rgba(139,92,246,0.3);z-index:10;';
        bx.innerHTML = '<div id="roulette-header" style="padding:0.4rem 0.8rem;border-bottom:1px solid rgba(139,92,246,0.15);background:#07070f;transition:border-color 0.3s,background 0.3s;"><span id="roulette-title" style="font-family:var(--font-display);font-size:0.6rem;color:var(--text-dim);letter-spacing:0.15em;transition:color 0.3s;">NOTIFICACAO</span></div><div style="padding:2rem;text-align:center;"><div style="font-family:var(--font-code);font-size:0.65rem;color:var(--text-dim);margin-bottom:0.8rem;letter-spacing:0.1em;">IDENTIFICANDO CLASSE...</div><div id="roulette-class-name" style="font-family:var(--font-display);font-size:1.6rem;color:var(--purple-bright);letter-spacing:0.15em;min-height:2rem;display:flex;align-items:center;justify-content:center;text-shadow:0 0 20px rgba(139,92,246,0.4);"></div><div id="roulette-subtitle" style="font-family:var(--font-ui);font-size:0.7rem;color:var(--text-dim);margin-top:0.5rem;letter-spacing:0.08em;min-height:1rem;opacity:0;transition:opacity 0.4s;"></div></div>';
        this.screen.appendChild(bx);
        requestAnimationFrame(function(){bx.style.opacity='1';});
        var cd = document.getElementById('roulette-class-name');
        var si = 0, sp = 80, ts = 0, mx = 30+Math.floor(Math.random()*10);
        var spin = function() {
            if(ts>=mx){cd.textContent='???';cd.style.color='var(--text-ghost)';cd.style.textShadow='none';setTimeout(function(){self.phase4_dangerReveal(bx);},1200);return;}
            cd.textContent=self.rpgClasses[si%self.rpgClasses.length];si++;ts++;
            if(ts>mx*0.6)sp=40;else if(ts>mx*0.3)sp=60;
            setTimeout(spin,sp);
        };
        setTimeout(spin,500);
    }
    phase4_dangerReveal(bx) {
        var self = this;
        var rh = document.getElementById('roulette-header');
        var rt = document.getElementById('roulette-title');
        var cd = document.getElementById('roulette-class-name');
        this.screen.style.border='3px solid #ef4444';
        this.screen.style.boxShadow='inset 0 0 60px rgba(239,68,68,0.15)';
        this.screen.style.animation='dangerPulse 0.8s ease-in-out infinite';
        rh.style.borderColor='rgba(239,68,68,0.5)';rh.style.background='rgba(239,68,68,0.08)';
        rt.textContent='DANGER';rt.style.color='#ef4444';
        var fc=0;
        var flicker=setInterval(function(){
            cd.textContent=fc%2===0?'???':'';fc++;
            if(fc>6){
                clearInterval(flicker);
                cd.textContent=self.finalClass;cd.style.color='#ef4444';
                cd.style.textShadow='0 0 25px rgba(239,68,68,0.6),0 0 50px rgba(239,68,68,0.3)';
                var sub=document.getElementById('roulette-subtitle');
                sub.textContent=self.subtitle;sub.style.color='var(--gold)';sub.style.opacity='1';
                setTimeout(function(){
                    var bc=bx.querySelector('div:last-child');
                    var cbtn=document.createElement('button');
                    cbtn.style.cssText='margin-top:1.5rem;padding:0.7rem 2rem;background:rgba(239,68,68,0.1);border:1px solid rgba(239,68,68,0.5);color:#ef4444;font-family:var(--font-display);font-size:0.7rem;letter-spacing:0.15em;cursor:pointer;transition:all 0.2s;display:block;margin-left:auto;margin-right:auto;';
                    cbtn.textContent='ENTRAR NO SISTEMA';
                    cbtn.onmouseenter=function(){cbtn.style.boxShadow='0 0 20px rgba(239,68,68,0.3)';cbtn.style.borderColor='#ef4444';};
                    cbtn.onmouseleave=function(){cbtn.style.boxShadow='none';};
                    cbtn.onclick=function(){
                        self.screen.style.animation='none';self.screen.style.border='none';self.screen.style.boxShadow='none';
                        bx.style.opacity='0';setTimeout(function(){bx.remove();self.phase5_loadingInterface();},400);
                    };
                    bc.appendChild(cbtn);
                },600);
            }
        },100);
    }
    phase5_loadingInterface() {
        this.screen.style.background='#000';this.screen.innerHTML='';
        var steps=[
            {t:'[ CARREGANDO SISTEMA DA GUILDA ]',d:400,c:'var(--cyan)'},
            {t:'[ Inicializando modulos... ]',d:300,c:'var(--text-dim)'},
            {t:'[ Terminal: ONLINE ]',d:300,c:'var(--green)'},
            {t:'[ Arquivo de registros: ONLINE ]',d:250,c:'var(--green)'},
            {t:'[ Mapa da Guilda: ONLINE ]',d:250,c:'var(--green)'},
            {t:'[ Arsenal: ONLINE ]',d:200,c:'var(--green)'},
            {t:'[ Biblioteca: ONLINE ]',d:200,c:'var(--green)'},
            {t:'',d:200,c:'transparent'},
            {t:'[ Todos os modulos operacionais ]',d:400,c:'var(--gold)'},
            {t:'',d:100,c:'transparent'},
            {t:'[ Bem-vindo, '+(this.playerNick||'Aventureiro')+' ]',d:300,c:'var(--purple-bright)'},
            {t:'[ Classe: CODEMANCER ]',d:300,c:'#ef4444'},
            {t:'',d:400,c:'transparent'},
            {t:'[ Iniciando interface... ]',d:500,c:'var(--cyan)'}
        ];
        var ct=document.createElement('div');
        ct.style.cssText='position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:450px;max-width:90%;font-family:var(--font-code);font-size:0.75rem;line-height:1.8;';
        this.screen.appendChild(ct);
        var self=this;var i=0;
        var show=function(){
            if(i>=steps.length){setTimeout(function(){ct.style.transition='opacity 0.5s';ct.style.opacity='0';setTimeout(function(){self.phase6_tutorialIntro();},500);},800);return;}
            var s=steps[i];i++;
            if(s.t===''){setTimeout(show,s.d);return;}
            var ln=document.createElement('div');ln.style.color=s.c;ln.style.opacity='0';ln.style.transition='opacity 0.2s';ln.style.letterSpacing='0.05em';ln.textContent=s.t;
            ct.appendChild(ln);setTimeout(function(){ln.style.opacity='1';},30);
            setTimeout(show,s.d);
        };
        show();
    }
    phase6_tutorialIntro() {
        this.screen.innerHTML='';this.screen.style.background='#000';
        var self=this;
        var ct=document.createElement('div');
        ct.style.cssText='position:absolute;top:0;left:0;right:0;bottom:0;overflow-y:auto;padding:2rem;display:flex;flex-direction:column;align-items:center;';
        this.screen.appendChild(ct);
        var title=document.createElement('div');
        title.style.cssText='font-family:var(--font-display);font-size:1rem;color:var(--gold);letter-spacing:0.2em;margin-bottom:2rem;text-align:center;opacity:0;transition:opacity 0.5s;text-transform:uppercase;';
        title.textContent='Orientacao do Sistema';ct.appendChild(title);
        var secs=[
            {i:'[PAINEL]',n:'Painel da Guilda',d:'Seu painel principal. Aqui voce ve seu nivel, XP, sistemas desbloqueados e capitulos disponiveis.',c:'var(--purple-bright)'},
            {i:'[HISTORIA]',n:'Historia e Dialogo',d:'Cada capitulo comeca com uma historia. Personagens do mundo medieval apresentam problemas que voce resolve com codigo.',c:'var(--cyan)'},
            {i:'[CONCEITO]',n:'Conceito',d:'Apos a historia, o conceito de programacao e explicado com exemplos praticos em C.',c:'var(--blue)'},
            {i:'[EDITOR]',n:'Editor de Codigo',d:'Escreva e execute codigo C diretamente no navegador. O terminal mostra a saida do seu programa.',c:'var(--green)'},
            {i:'[TUTORIAL]',n:'Tutorial Guiado',d:'Um passo a passo interativo. Siga as instrucoes, resolva cada etapa e ganhe XP.',c:'var(--orange)'},
            {i:'[ATIVIDADES]',n:'Atividades',d:'Desafios para fixar o conteudo. Complete todas para desbloquear o proximo capitulo.',c:'var(--gold)'}
        ];
        secs.forEach(function(sc,idx){
            var card=document.createElement('div');
            card.style.cssText='width:100%;max-width:500px;padding:1rem;margin-bottom:0.6rem;background:#0a0a14;border:1px solid rgba(139,92,246,0.1);display:flex;gap:1rem;align-items:flex-start;opacity:0;transform:translateY(15px);transition:opacity 0.4s,transform 0.4s;';
            card.innerHTML='<div style="min-width:90px;font-family:var(--font-display);font-size:0.6rem;color:'+sc.c+';letter-spacing:0.1em;text-align:center;padding:0.3rem;border:1px solid rgba(139,92,246,0.15);background:#07070f;">'+sc.i+'</div><div><div style="font-family:var(--font-display);font-size:0.7rem;color:'+sc.c+';letter-spacing:0.1em;margin-bottom:0.3rem;">'+sc.n+'</div><div style="font-size:0.78rem;color:var(--text-secondary);line-height:1.5;">'+sc.d+'</div></div>';
            ct.appendChild(card);
            setTimeout(function(){card.style.opacity='1';card.style.transform='translateY(0)';},200+idx*200);
        });
        setTimeout(function(){title.style.opacity='1';},100);
        setTimeout(function(){
            var fm=document.createElement('div');
            fm.style.cssText='margin-top:1.5rem;text-align:center;opacity:0;transition:opacity 0.5s;';
            fm.innerHTML='<div style="font-family:var(--font-code);font-size:0.7rem;color:var(--text-dim);margin-bottom:1rem;letter-spacing:0.08em;">Cada capitulo que voce completa restaura um sistema da Guilda.<br>Domine a linguagem C para reconstruir tudo.</div><button id="intro-start-game" style="padding:0.7rem 2.5rem;background:rgba(139,92,246,0.1);border:1px solid rgba(139,92,246,0.5);color:var(--purple-bright);font-family:var(--font-display);font-size:0.75rem;letter-spacing:0.15em;cursor:pointer;transition:all 0.2s;">INICIAR A JORNADA</button>';
            ct.appendChild(fm);
            setTimeout(function(){fm.style.opacity='1';},300);
            setTimeout(function(){
                var sb=document.getElementById('intro-start-game');
                if(sb){
                    sb.onmouseenter=function(){sb.style.boxShadow='0 0 20px rgba(139,92,246,0.3)';};
                    sb.onmouseleave=function(){sb.style.boxShadow='none';};
                    sb.onclick=function(){
                        ct.style.transition='opacity 0.5s';ct.style.opacity='0';
                        setTimeout(function(){
                            self.screen.classList.remove('active');self.screen.innerHTML='';
                            self.screen.style.border='none';self.screen.style.boxShadow='none';self.screen.style.animation='none';
                            if(self.onComplete)self.onComplete(self.playerNick);
                        },500);
                    };
                }
            },100);
        },200+secs.length*200+400);
    }
}
