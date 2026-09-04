/* ═══════════════════════════════════════════════════════════════
   CODE LEVELER — BOSS BATTLE RAIDS: BATTLE UI CONTROLLER
   Renderização do Lobby, Arena de Cenário Dimensional, HUD e Telas Finais
   ═══════════════════════════════════════════════════════════════ */

class RaidBattleUI {
    constructor() {
        this.container = null;
        this.activeChallenge = null;
    }

    init() {
        this.container = document.getElementById('screen-boss-raid');
    }

    /**
     * Helper de Ícones SVG Profissionais para a Boss Raid
     */
    static getSvgIcon(name, extraClass = '') {
        const icons = {
            party: `<svg class="raid-svg-icon ${extraClass}" viewBox="0 0 24 24" fill="currentColor"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>`,
            players: `<svg class="raid-svg-icon ${extraClass}" viewBox="0 0 24 24" fill="currentColor"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>`,
            book: `<svg class="raid-svg-icon ${extraClass}" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z"/></svg>`,
            check: `<svg class="raid-svg-icon ${extraClass}" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>`,
            clock: `<svg class="raid-svg-icon ${extraClass}" viewBox="0 0 24 24" fill="currentColor"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>`,
            refresh: `<svg class="raid-svg-icon ${extraClass}" viewBox="0 0 24 24" fill="currentColor"><path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/></svg>`,
            lightning: `<svg class="raid-svg-icon ${extraClass}" viewBox="0 0 24 24" fill="currentColor"><path d="M7 2v11h3v9l7-12h-4l4-8z"/></svg>`,
            warning: `<svg class="raid-svg-icon ${extraClass}" viewBox="0 0 24 24" fill="currentColor"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>`,
            skull: `<svg class="raid-svg-icon ${extraClass}" viewBox="0 0 1049 869" fill="currentColor"><path d="M524.195 182.468C537.341 175.946 596.606 151.705 607.821 154.982C639.72 164.3 684.075 201.796 712.045 221.497C723.432 229.515 736.472 234.69 748.271 241.795C750.573 243.181 762.857 244.723 766.659 245.597C769.055 249.355 773.341 256.431 774.914 261.151C785.18 291.886 796.288 325.66 797.496 358.199C797.569 360.164 795.744 368.857 795.306 371.378L789.971 401.603C788.518 409.688 788.292 417.071 786.773 425.196C810.277 428.256 835.633 434.007 859.157 438.16C869.828 440.044 881.328 443.737 892.324 445.978C864.559 471.687 835.779 505.437 812.805 535.805C805.141 546.522 798.512 558.015 791.099 568.892C786.521 575.614 780.223 581.732 775.657 588.514C773.68 591.454 769.878 595.635 768.384 598.614C759.552 616.206 748.795 632.358 738.636 649.154C729.604 664.091 721.276 679.851 712.901 695.041C712.417 695.917 711.906 695.652 711.096 695.625C704.109 686.534 699.192 661.257 694.925 649.605C692.124 641.954 688.879 634.906 685.588 627.454C684.062 648.994 682.004 668.298 683.119 690.031C683.909 705.459 683.511 731.147 680.691 746.317C668.115 758.222 654.087 768.003 640.789 778.972C622.553 794.003 604.775 808.648 585.724 822.65C580.368 793.074 576.466 765.886 566.672 737.431C564.124 746.443 561.874 781.381 560.925 792.616C559.505 810.725 558.423 828.012 555.51 845.956C545.171 853.262 534.561 861.271 524.242 868.757C513.744 861.331 503.38 853.706 493.165 845.896C491.196 838.258 489.892 820.991 489.224 812.763L485.212 763.564C484.509 755.375 483.927 745.255 481.908 737.425C471.848 766.172 468.517 792.762 462.734 822.498C445.243 810.798 425.976 793.671 409.413 780.379C397.664 770.943 377.285 756.165 367.394 745.693C366.479 733.987 364.231 714.564 365.036 703.217C366.935 676.441 364.744 654.077 362.907 627.5C359.46 635.105 356.016 643.121 353.125 650.952C350.546 657.933 342.085 694.384 336.529 695.778C335.188 694.922 285.511 607.686 280.386 598.767C275.947 591.043 262.196 576.404 257.965 569.675C230.273 525.639 194.692 481.014 156.033 446.012C168.036 443.892 179.536 439.954 191.003 437.86C213.863 433.685 238.778 428.65 261.67 425.293C260.369 418.249 260.146 410.435 258.874 403.227L253.859 375.141C253.185 371.463 250.849 360.071 251.029 356.646C252.751 323.983 263.677 289.563 274.493 258.772C275.832 254.963 279.669 248.801 281.671 245.59C286.412 244.25 296.407 243.628 300.074 241.751C312.014 235.638 324.821 228.442 336.356 221.52C340.724 218.898 348.113 212.104 352.438 209.136C371.62 195.975 420.923 157.813 441.451 154.558C472.845 159.539 495.362 169.39 524.195 182.468ZM316.939 448.92C319.44 453.732 326.834 469.118 329.235 472.667C339.468 487.785 357.954 508.219 371.802 520.16C387.708 534.046 406.591 547.75 424.275 559.575C419.063 509.428 410.47 459.354 410.929 408.853C411.215 377.497 415.854 346.888 416.987 315.659C417.462 302.557 417.788 289.695 419.051 276.637C419.396 273.074 420.798 263.185 420.42 260.444C403.66 280.074 392.139 298.225 378.814 320.357C370.03 334.947 361.394 348.415 353.615 363.772C347.382 376.077 341.339 388.228 335.266 400.66C329.81 411.832 322.451 423.211 318.409 435.095C317.249 438.503 317.118 445.179 316.939 448.92ZM540.174 541.087C542.696 561.28 543.698 581.095 542.437 601.454C541.535 616.053 542.218 630.088 543.194 644.654C551.747 642.046 558.191 637.262 564.674 631.197C569.153 626.857 574.741 621.044 579.917 617.839C570.182 598.634 561.283 579.058 551.004 560.146C548.456 555.454 543.247 545.009 540.174 541.087ZM505.555 644.88C505.698 635.663 506.799 623.353 506.59 614.945C506.198 599.178 505.204 584.752 505.629 568.806C505.78 563.145 508.382 544.637 507.975 541.107C500.637 554.206 493.575 567.458 486.792 580.856C480.887 592.741 474.825 606.325 468.545 617.772C474.149 621.468 478.335 626.518 483.49 631.011C491.356 638.012 495.611 641.363 505.555 644.88ZM731.489 448.822C731.349 445.354 731.316 437.683 729.929 434.611C717.215 406.536 702.377 378.633 688.136 351.291C680.233 336.119 670.564 322.428 661.924 307.759C653.695 295.115 638.678 269.739 627.623 260.3C630.848 280.678 630.496 301.118 631.657 321.566C633.675 357.053 638.877 392.086 637.583 427.796C635.984 472.004 628.485 515.733 624.298 559.681C640.443 547.896 664.213 532.281 678.202 518.454C691.626 507.088 709.013 487.359 719.006 472.786C722.63 467.496 728.098 454.983 731.489 448.822Z"/><path d="M262.749 0.696387C271.653 -0.633434 302.716 2.8285 312.49 4.31959C262.639 15.1468 224.359 39.9367 188.322 75.5597C169.98 94.0136 153.158 113.919 138.022 135.083C134.305 140.185 127.461 148.951 123.935 155.894C116.997 169.551 101.891 213.006 114.798 225.982C126.662 233.215 142.626 232.09 156.087 234.6C192.017 241.3 230.535 247.804 267.113 247.14C256.048 263.117 242.518 308.369 238.192 328.323C227.977 322.536 221.634 317.185 210.118 312.208C205.472 310.744 200.588 310.158 195.576 309.149C173.628 304.732 137.216 298.56 115.49 300.084C88.0788 302.008 69.4583 321.1 39.0956 308.077C22.2264 300.841 21.9039 298.845 13.2367 282.526C9.09518 275.279 3.90656 268.159 0 260.149C2.9218 242.522 6.71225 221.55 8.68245 203.967C9.98972 191.2 11.2247 178.426 12.388 165.645C15.1392 135.868 15.0974 135.891 34.7199 113.17C50.0091 95.745 66.7012 79.6024 84.6281 64.9051C121.44 34.7773 146.524 20.2804 194.282 8.95151C203.56 6.75037 213.226 3.95732 222.754 2.652C235.943 0.845022 249.442 1.67653 262.749 0.696387Z"/><path d="M770.859 0.708586C771.171 0.626953 771.483 0.52543 771.802 0.465043C778.65 -0.840225 787.098 1.00122 794.112 1.14854C803.94 1.35426 813.947 1.19036 823.715 2.36693C832.866 3.46916 841.831 5.882 850.776 8.06919C884.122 16.2274 914.282 27.7196 942.372 47.8981C965.02 64.1654 1024.54 116.176 1033.19 141.47C1035.37 147.869 1035.23 156.341 1035.87 163.107C1037.13 176.609 1038.27 190.145 1039.77 203.622C1041.87 222.572 1045.43 241.516 1048.55 260.326C1042.48 272.115 1034.51 282.548 1028.63 294.522C1023.27 305.443 1006.14 309.384 995.227 311.61C972.28 316.288 953.673 300.723 931.29 299.994C913.346 299.84 893.604 303.094 875.614 304.582C868.501 305.17 860.279 307.562 853.397 309.473C835.812 310.537 824.717 319.11 810.396 328.503C805.871 306.704 793.03 265.883 781.43 247.166C820.151 248.038 854.406 241.07 891.985 234.745C931.735 228.055 947.017 235.596 934.834 183.695C932.445 173.535 928.198 162.438 923.088 153.311C876.145 83.9346 820.662 24.1156 736.386 4.21504C747.793 2.57794 759.326 1.99596 770.859 0.708586Z"/></svg>`,
            sword: `<svg class="raid-svg-icon ${extraClass}" viewBox="0 0 24 24" fill="currentColor"><path d="M19.7 2.3a1 1 0 0 0-1.4 0l-4.9 4.9-1.4-1.4a1 1 0 0 0-1.4 0l-1.4 1.4a1 1 0 0 0 0 1.4l1.4 1.4-6.6 6.6-1.6-.5-.8.8 2.3 2.3-3.2 3.2 1.4 1.4 3.2-3.2 2.3 2.3.8-.8-.5-1.6 6.6-6.6 1.4 1.4a1 1 0 0 0 1.4 0l1.4-1.4a1 1 0 0 0 0-1.4l-1.4-1.4 4.9-4.9a1 1 0 0 0 0-1.4l-1.6-1.6zm-8.4 9.8l-1.4-1.4 3.5-3.5 1.4 1.4-3.5 3.5zM4.3 2.3a1 1 0 0 0-1.4 0l-1.6 1.6a1 1 0 0 0 0 1.4l4.9 4.9-1.4 1.4a1 1 0 0 0 0 1.4l1.4 1.4a1 1 0 0 0 1.4 0l1.4-1.4 6.6 6.6-.5 1.6.8.8 2.3-2.3 3.2 3.2 1.4-1.4-3.2-3.2 2.3-2.3-.8-.8-1.6.5-6.6-6.6 1.4-1.4a1 1 0 0 0 0-1.4l-1.4-1.4a1 1 0 0 0-1.4 0l-1.4 1.4-4.9-4.9zm5.6 5.6l1.4 1.4-3.5 3.5-1.4-1.4 3.5-3.5z"/></svg>`,
            flask: `<svg class="raid-svg-icon ${extraClass}" viewBox="0 0 24 24" fill="currentColor"><path d="M19 19L14 8V4h1V2H9v2h1v4L5 19c-.55.88-.13 2 1 2h12c1.13 0 1.55-1.12 1-2zm-7.66-9l1.66 2.65V4h-1.66v6zM7.5 19l3.5-5.6 3.5 5.6H7.5z"/></svg>`,
            sparkles: `<svg class="raid-svg-icon ${extraClass}" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 5.4 5.6 2.6-5.6 2.6L12 18l-2.4-5.4-5.6-2.6 5.6-2.6L12 2zm7 13l1.2 2.7 2.8 1.3-2.8 1.3L19 23l-1.2-2.7-2.8-1.3 2.8-1.3L19 15zM5 15l1.2 2.7 2.8 1.3-2.8 1.3L5 23l-1.2-2.7-2.8-1.3 2.8-1.3L5 15z"/></svg>`,
            shield: `<svg class="raid-svg-icon ${extraClass}" viewBox="0 0 24 24" fill="currentColor"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/></svg>`,
            wind: `<svg class="raid-svg-icon ${extraClass}" viewBox="0 0 24 24" fill="currentColor"><path d="M14.5 17c0 1.65-1.35 3-3 3s-3-1.35-3-3h2c0 .55.45 1 1 1s1-.45 1-1-.45-1-1-1H2v-2h9.5c1.65 0 3 1.35 3 3zm4-8c0-1.65-1.35-3-3-3s-3 1.35-3 3h2c0-.55.45-1 1-1s1 .45 1 1-.45 1-1 1H2v2h13.5c1.65 0 3-1.35 3-3zm2 4c0-1.65-1.35-3-3-3s-3 1.35-3 3h2c0-.55.45-1 1-1s1 .45 1 1-.45 1-1 1H2v2h15.5c1.65 0 3-1.35 3-3z"/></svg>`,
            trophy: `<svg class="raid-svg-icon ${extraClass}" viewBox="0 0 24 24" fill="currentColor"><path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94A5.01 5.01 0 0 0 11 15.9V19H7v2h10v-2h-4v-3.1a5.01 5.01 0 0 0 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z"/></svg>`,
            star: `<svg class="raid-svg-icon ${extraClass}" viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>`,
            heart: `<svg class="raid-svg-icon ${extraClass}" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>`,
            coin: `<svg class="raid-svg-icon ${extraClass}" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.31-8.86c-1.77-.45-2.34-.94-2.34-1.67 0-.84.79-1.43 2.1-1.43 1.38 0 1.9.66 1.94 1.64h1.71c-.05-1.34-.87-2.57-2.49-2.97V5H10.9v1.69c-1.51.32-2.72 1.3-2.72 2.81 0 1.79 1.49 2.69 3.66 3.21 1.95.46 2.34 1.15 2.34 1.87 0 .53-.39 1.39-2.1 1.39-1.6 0-2.23-.72-2.32-1.64H8.04c.1 1.7 1.36 2.66 2.86 2.97V19h2.34v-1.67c1.52-.29 2.72-1.16 2.73-2.77-.01-2.2-1.9-2.96-3.66-3.42z"/></svg>`,
            medal: `<svg class="raid-svg-icon ${extraClass}" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C9.24 2 7 4.24 7 7c0 2.85 2.43 5.17 5.41 5.92L9 22l3-1.5 3 1.5-3.41-9.08C14.57 12.17 17 9.85 17 7c0-2.76-2.24-5-5-5zm0 8c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"/></svg>`,
            lightbulb: `<svg class="raid-svg-icon ${extraClass}" viewBox="0 0 24 24" fill="currentColor"><path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2.85 11.1l-.85.6V16h-4v-2.3l-.85-.6C7.8 12.16 7 10.63 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1z"/></svg>`,
            back: `<svg class="raid-svg-icon ${extraClass}" viewBox="0 0 24 24" fill="currentColor"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>`,
            close: `<svg class="raid-svg-icon ${extraClass}" viewBox="0 0 24 24" fill="currentColor"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>`
        };
        return icons[name] || '';
    }

    /**
     * Renderiza o Lobby da Raid
     */
    renderLobby(raidData, boss, currentUser, onReadyToggle, onAvatarSelect, onLeave) {
        if (!this.container) this.init();
        if (!this.container) return;

        const players = raidData.players || [];
        const isMyReady = players.some(p => p.uid === currentUser.uid && p.ready);
        const allReady = players.length > 0 && players.every(p => p.ready);

        this.container.innerHTML = `
            <div class="boss-raid-wrapper lobby-mode">
                <!-- Cabeçalho do Lobby -->
                <div class="raid-header">
                    <button id="btn-leave-raid" class="icon-button" title="Voltar ao Mapa">
                        ${RaidBattleUI.getSvgIcon('back')}<span class="btn-label">MAPA</span>
                    </button>
                    <div class="raid-header-title">
                        <span class="raid-tag">BOSS BATTLE RAID</span>
                        <h2>${boss.name.toUpperCase()}</h2>
                    </div>
                    <div class="raid-header-right">
                        <span class="party-status-badge">${RaidBattleUI.getSvgIcon('players')} ${players.length}/4 JOGADORES</span>
                    </div>
                </div>

                <!-- Conteúdo Principal do Lobby -->
                <div class="raid-lobby-grid">
                    <!-- Coluna do Chefe -->
                    <div class="boss-lobby-card">
                        <div class="boss-portrait-wrap">
                            <div class="boss-portrait-aura"></div>
                            <img src="${boss.spriteUrl}" alt="${boss.name}" class="boss-lobby-img" />
                            <div class="boss-difficulty-tag">CAPÍTULO ${boss.chapterId} • NV.${boss.recommendedLevel}+</div>
                        </div>
                        <div class="boss-lobby-details">
                            <h3 class="boss-card-title">${boss.name}</h3>
                            <div class="boss-card-subtitle">${boss.title}</div>
                            <p class="boss-card-desc">${boss.desc}</p>
                            <div class="boss-subject-tag">${RaidBattleUI.getSvgIcon('book')} Tópico: <strong>${boss.subject}</strong></div>
                            <div class="boss-stats-row">
                                <div class="boss-stat-item"><span>HP Base:</span> <strong>${boss.baseHp}</strong></div>
                                <div class="boss-stat-item"><span>ATK Base:</span> <strong>${boss.baseAttack}</strong></div>
                                <div class="boss-stat-item"><span>DEF Base:</span> <strong>${boss.baseDefense}</strong></div>
                                <div class="boss-stat-item"><span>SPD Base:</span> <strong>${boss.baseSpeed}</strong></div>
                            </div>
                        </div>
                    </div>

                    <!-- Coluna dos Jogadores (Até 4 Cards) -->
                    <div class="players-lobby-column">
                        <div class="players-cards-grid">
                            ${[0, 1, 2, 3].map(slot => {
                                const player = players[slot];
                                if (!player) {
                                    return `
                                        <div class="lobby-player-card empty-slot">
                                            <div class="empty-slot-icon">+</div>
                                            <div class="empty-slot-label">Aguardando Aliado...</div>
                                        </div>
                                    `;
                                }

                                const isSelf = player.uid === currentUser.uid;
                                const subClass = player.subclass || 'Aprendiz';
                                const avatarSrc = player.photoURL || `assets/avatars/avatar_${player.avatarId || '02'}.png`;

                                 const pHp = player.maxHp || player.currentHp || (typeof CombatFormulas !== 'undefined' ? CombatFormulas.calculatePlayerStats(player, typeof AVATAR_SKILLS_DATA !== 'undefined' ? AVATAR_SKILLS_DATA[player.avatarId || '02'] : null).maxHp : 600);
                                const pAtk = player.attack || (typeof CombatFormulas !== 'undefined' ? CombatFormulas.calculatePlayerStats(player, typeof AVATAR_SKILLS_DATA !== 'undefined' ? AVATAR_SKILLS_DATA[player.avatarId || '02'] : null).attack : 150);
                                const pSpd = player.speed || (typeof CombatFormulas !== 'undefined' ? CombatFormulas.calculatePlayerStats(player, typeof AVATAR_SKILLS_DATA !== 'undefined' ? AVATAR_SKILLS_DATA[player.avatarId || '02'] : null).speed : 100);

                                return `
                                    <div class="lobby-player-card ${player.ready ? 'is-ready' : ''} ${isSelf ? 'is-self' : ''}">
                                        <div class="card-ready-indicator">${player.ready ? `${RaidBattleUI.getSvgIcon('check')} PRONTO` : `${RaidBattleUI.getSvgIcon('clock')} PREPARANDO...`}</div>
                                        <div class="card-avatar-wrap">
                                            <img src="${avatarSrc}" alt="${player.displayName || 'Jogador'}" />
                                            ${isSelf && !player.ready ? `
                                                <button class="btn-change-avatar-lobby" id="btn-change-avatar-lobby" title="Trocar Avatar">
                                                    ${RaidBattleUI.getSvgIcon('refresh')}
                                                </button>
                                            ` : ''}
                                        </div>
                                        <div class="card-player-info">
                                            <div class="card-player-name">${player.displayName || 'Codemancer'}</div>
                                            <div class="card-player-stats">Lv. ${player.level || 1} • ${RaidBattleUI.getSvgIcon('lightning')} ${player.codePower || 1000} CP</div>
                                            <div class="card-player-subclass">${subClass.toUpperCase()}</div>
                                            <div class="card-player-combat-stats">
                                                <span class="combat-stat-pill hp" title="Vida Máxima">${RaidBattleUI.getSvgIcon('heart')} ${pHp} HP</span>
                                                <span class="combat-stat-pill atk" title="Poder de Ataque">${RaidBattleUI.getSvgIcon('sword')} ${pAtk} ATK</span>
                                                <span class="combat-stat-pill spd" title="Velocidade de Turno">${RaidBattleUI.getSvgIcon('wind')} ${pSpd} SPD</span>
                                            </div>
                                        </div>
                                    </div>
                                `;
                            }).join('')}
                        </div>

                        <!-- Barra de Ações do Lobby -->
                        <div class="lobby-action-bar">
                            <div class="lobby-status-text">
                                ${allReady ? 'Todos estão prontos! Iniciando contagem...' : 'Aguardando confirmação de prontidão dos jogadores.'}
                            </div>
                            <button id="btn-ready-toggle" class="glow-button ${isMyReady ? 'accent' : 'primary'}">
                                <span class="btn-text">${isMyReady ? 'CANCELAR PRONTO' : `${RaidBattleUI.getSvgIcon('check')} ESTOU PRONTO!`}</span>
                                <span class="btn-glow"></span>
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Modal de Troca de Avatar no Lobby -->
                <div id="modal-lobby-avatar-picker" class="modal hidden">
                    <div class="modal-backdrop" id="modal-backdrop-avatar"></div>
                    <div class="modal-content" style="max-width:560px;">
                        <h3 class="modal-title" style="color:var(--cyan);margin-bottom:1rem;">ESCOLHA SEU AVATAR PARA A RAID</h3>
                        <div class="lobby-avatar-selection-grid" id="lobby-avatar-selection-grid"></div>
                    </div>
                </div>
            </div>
        `;

        // Eventos do Lobby
        const btnLeave = document.getElementById('btn-leave-raid');
        if (btnLeave) btnLeave.onclick = () => onLeave();

        const btnReady = document.getElementById('btn-ready-toggle');
        if (btnReady) btnReady.onclick = () => onReadyToggle();

        const btnChangeAvatar = document.getElementById('btn-change-avatar-lobby');
        if (btnChangeAvatar) {
            btnChangeAvatar.onclick = () => this.openAvatarPicker(currentUser, onAvatarSelect);
        }

        const modalBackdrop = document.getElementById('modal-backdrop-avatar');
        if (modalBackdrop) {
            modalBackdrop.onclick = () => {
                const modal = document.getElementById('modal-lobby-avatar-picker');
                if (modal) modal.classList.add('hidden');
            };
        }
    }

    /**
     * Seletor de Avatar no Lobby
     */
    openAvatarPicker(currentUser, onAvatarSelect) {
        const modal = document.getElementById('modal-lobby-avatar-picker');
        const grid = document.getElementById('lobby-avatar-selection-grid');
        if (!modal || !grid) return;

        grid.innerHTML = '';
        const allAvatars = (typeof AVATAR_SKILLS_DATA !== 'undefined') ? Object.values(AVATAR_SKILLS_DATA) : [];
        const isTeacher = (typeof authManager !== 'undefined' && (authManager.isTeacher() || authManager.isAdmin()));

        allAvatars.forEach(av => {
            if (av.teacherOnly && !isTeacher) return;
            const item = document.createElement('div');
            item.className = 'lobby-avatar-option-card';
            item.innerHTML = `
                <img src="assets/avatars/avatar_${av.id}.png" alt="${av.name}" />
                <div class="avatar-option-name">${av.name}</div>
                <div class="avatar-option-stats">HP:${av.baseHp || 1200} | ATK:${av.baseAttack || 100} | SPD:${av.baseSpeed || 100}</div>
            `;
            item.onclick = () => {
                modal.classList.add('hidden');
                onAvatarSelect(av.id, av);
            };
            grid.appendChild(item);
        });

        modal.classList.remove('hidden');
    }

    /**
     * Exibe o overlay de contagem regressiva sincronizada 5..4..3..2..1
     */
    showCountdown(count, onComplete) {
        let overlay = document.getElementById('raid-countdown-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.id = 'raid-countdown-overlay';
            overlay.className = 'raid-countdown-overlay';
            document.body.appendChild(overlay);
        }

        overlay.innerHTML = `
            <div class="countdown-pulse-number">${count > 0 ? count : 'BATTLE START!'}</div>
        `;
        overlay.classList.add('active');

        if (window.raidAudio) window.raidAudio.playTone(count > 0 ? 440 : 880, 0.12, 'triangle', 0.2);

        if (count <= 0) {
            setTimeout(() => {
                overlay.classList.remove('active');
                if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
                if (onComplete) onComplete();
            }, 800);
        }
    }

    /**
     * Renderiza o Cenário e Arena de Batalha Cinemática
     */
    renderBattleArena(raidData, boss, currentUser, activeTurnEntity, timeline = [], onActionSelect, onDefensiveReaction, onSurrender) {
        if (!this.container) this.init();
        if (!this.container) return;

        const bossState = raidData.bossState || boss;
        const players = raidData.players || [];
        const hpPct = Math.max(0, Math.min(100, (bossState.currentHp / bossState.maxHp) * 100)).toFixed(1);

        // Identifica estado da fase atual
        const isPartyPhase = (activeTurnEntity && activeTurnEntity.isPartyPhase) || raidData.status === 'PARTY_PHASE' || raidData.status === 'ACTIVE';
        const isBossPhase = (activeTurnEntity && activeTurnEntity.isBossPhase) || raidData.status === 'BOSS_PHASE';
        const currentRound = (activeTurnEntity && activeTurnEntity.round) || raidData.round || 1;

        const myPlayerData = players.find(p => p.uid === currentUser.uid) || players[0];
        const isAlive = myPlayerData && myPlayerData.combatStatus !== 'DOWNED';
        const isTargeted = myPlayerData && myPlayerData.combatStatus === 'TARGETED';
        const hasDownedPlayers = players.some(p => p.combatStatus === 'DOWNED');
        const hasActed = window.bossRaidManager ? window.bossRaidManager.hasActedInCurrentPartyPhase : false;

        // Constrói a lista visual de fases
        let displayTimeline = timeline.slice(0, 5);

        this.container.innerHTML = `
            <div class="boss-raid-wrapper battle-mode">
                <!-- Barra Superior do Combate -->
                <div class="battle-top-bar">
                    <!-- Botão de Desistir — LADO ESQUERDO -->
                    <button class="btn-surrender-raid" id="btn-surrender-raid" title="Desistir e abandonar a Boss Battle">
                        ${RaidBattleUI.getSvgIcon('close')} DESISTIR
                    </button>

                    <!-- Capítulo + Nome do Boss — CENTRO ABSOLUTO -->
                    <div class="battle-header-center">
                        <span class="battle-chapter-pill">CAPÍTULO ${boss.chapterId} • RODADA ${currentRound}</span>
                        <span class="battle-boss-title">${boss.name || boss.title || 'Boss Raid'}</span>
                    </div>

                    <!-- Timer — LADO DIREITO -->
                    <div class="battle-header-timer">
                        <div class="challenge-timer-badge" id="challenge-timer-badge">
                            ${RaidBattleUI.getSvgIcon('clock')}
                            <span id="challenge-timer-val">--</span>
                        </div>
                    </div>
                </div>

                <!-- Alerta Vermelho de Mira do Boss -->
                <div id="boss-target-warning-banner" class="boss-target-warning-banner ${isTargeted ? 'active' : ''}">
                    ${RaidBattleUI.getSvgIcon('warning')} ALERTA: O BOSS FIXOU A MIRA EM VOCÊ! PREPARE SUA REAÇÃO DEFENSIVA!
                </div>

                <!-- LAYOUT PRINCIPAL EM 2 COLUNAS -->
                <div class="battle-main-layout">
                    <!-- COLUNA ESQUERDA: ARENA DO BOSS + DOCK DE AÇÕES + TERMINAL -->
                    <div class="battle-left-column">
                        <!-- Cenário Dimensional da Batalha (Battle Scenery Arena) -->
                        <div class="boss-raid-arena" id="boss-raid-arena">
                            <div class="arena-background-rift"></div>
                            <div class="arena-dust-particles"></div>

                            <!-- Indicador de Fases - Lado Esquerdo do Cenário -->
                            <div class="battle-turn-timeline-vertical" id="battle-turn-timeline-vertical">
                                <span class="timeline-vertical-label">FASES</span>
                                <div class="timeline-chips-vertical">
                                    ${displayTimeline.map((t, idx) => {
                                        const isBoss = t.isBoss;
                                        return `
                                            <div class="timeline-chip-v ${isBoss ? 'is-boss' : 'is-hero'} ${idx === 0 ? 'current' : ''}" title="${t.name}">
                                                <div class="timeline-chip-v-avatar ${isBoss ? 'boss-diamond-avatar' : 'player-square-avatar'}">
                                                    ${isBoss ? `
                                                        <div class="boss-mini-diamond-wrap">
                                                            <img src="${boss.spriteUrl || 'assets/bosses/boss_0.png'}" alt="Boss" class="boss-timeline-img" />
                                                        </div>
                                                    ` : `
                                                        <div class="party-chip-icon-wrap" style="display:flex;align-items:center;justify-content:center;width:100%;height:100%;color:#38bdf8;">
                                                            ${RaidBattleUI.getSvgIcon('party')}
                                                        </div>
                                                    `}
                                                </div>
                                                <span class="timeline-chip-v-name">${isBoss ? 'BOSS' : 'PARTY'}</span>
                                            </div>
                                        `;
                                    }).join('')}
                                </div>
                            </div>

                            <!-- 1. Camada Superior: Palco do Chefe (Barra de Vida ACIMA do Losango com Borda Vermelha) -->
                            <div class="boss-stage-area" id="boss-stage-area">
                                <div class="boss-entity-wrap ${isBossPhase ? 'active-turn' : ''}" id="boss-entity-wrap">
                                    <div class="boss-aura-ring"></div>
                                    <div class="boss-hud-overlay">
                                        <div class="boss-name-tag">${boss.name}</div>
                                        <div class="boss-subtitle-tag">${boss.title}</div>
                                        <div class="boss-hp-bar-container">
                                            <div class="boss-hp-bar-fill" id="boss-hp-bar-fill" style="width: ${hpPct}%;"></div>
                                            <span class="boss-hp-text" id="boss-hp-text">${bossState.currentHp} / ${bossState.maxHp} (${hpPct}%)</span>
                                        </div>
                                    </div>
                                    <div class="boss-rhombus-frame">
                                        <div class="boss-rhombus-inner">
                                            <img src="${boss.spriteUrl}" alt="${boss.name}" class="boss-battle-sprite" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- 2. Camada Central: Campo de Colisão e Afastamento -->
                            <div class="combat-clash-field" id="combat-clash-field"></div>

                            <!-- 3. Camada Inferior: Linha de Heróis (Party Row - Reduzida e Afastada) -->
                            <div class="party-battle-row" id="party-battle-row">
                                ${players.map(p => {
                                    const isSelf = p.uid === currentUser.uid;
                                    const isDown = p.combatStatus === 'DOWNED';
                                    const isHeroTargeted = p.combatStatus === 'TARGETED';
                                    const pHpPct = Math.max(0, Math.min(100, ((p.currentHp || 600) / (p.maxHp || 600)) * 100)).toFixed(0);
                                    const avatarSrc = p.photoURL || `assets/avatars/avatar_${p.avatarId || '02'}.png`;

                                    return `
                                        <div class="hero-battle-card ${isSelf && isPartyPhase && !isDown ? 'active-turn' : ''} ${isDown ? 'is-downed' : ''} ${isHeroTargeted ? 'is-targeted' : ''}" id="hero-card-${p.uid}">
                                            <div class="hero-pedestal"></div>
                                            <div class="hero-card-inner">
                                                <div class="hero-avatar-container">
                                                    <img src="${avatarSrc}" alt="${p.displayName || 'Herói'}" class="hero-battle-avatar" />
                                                    ${isHeroTargeted ? `<div class="target-crosshair">${RaidBattleUI.getSvgIcon('crosshair')}</div>` : ''}
                                                    ${isDown ? `<div class="downed-skull-badge">${RaidBattleUI.getSvgIcon('skull')} CAÍDO</div>` : ''}
                                                </div>
                                                <div class="hero-name-label">${p.displayName || 'Codemancer'}</div>
                                                <div class="hero-subclass-label">${(p.subclass || 'Aprendiz').toUpperCase()}</div>
                                                <div class="hero-hp-bar-container">
                                                    <div class="hero-hp-bar-fill" style="width: ${pHpPct}%;"></div>
                                                    <span class="hero-hp-text">${p.currentHp || 0} / ${p.maxHp || 600}</span>
                                                </div>
                                            </div>
                                        </div>
                                    `;
                                }).join('')}
                            </div>
                        </div>

                        <!-- Dock de Ações Simultâneas da Batalha -->
                        <div class="battle-action-dock" id="battle-action-dock">
                            ${isPartyPhase && isAlive && !hasActed ? `
                                <div class="action-buttons-group">
                                    <button class="glow-button primary raid-action-btn" id="btn-action-attack">
                                        <span class="btn-text">${RaidBattleUI.getSvgIcon('sword')} ATACAR</span>
                                        <span class="btn-glow"></span>
                                    </button>
                                    <button class="glow-button secondary raid-action-btn" id="btn-action-item" title="Cura Individual (+45% HP)">
                                        <span class="btn-text">${RaidBattleUI.getSvgIcon('flask')} CURA INDIVIDUAL (${(typeof app !== 'undefined' && app.engine && app.engine.state.raidInventory && app.engine.state.raidInventory.soloPotions) ?? 2})</span>
                                    </button>
                                    <button class="glow-button secondary raid-action-btn" id="btn-action-item-group" title="Cura em Grupo (+35% HP para os 4 jogadores)" style="border-color:#38bdf8;color:#38bdf8;">
                                        <span class="btn-text">${RaidBattleUI.getSvgIcon('sparkles')} CURA EM GRUPO (${(typeof app !== 'undefined' && app.engine && app.engine.state.raidInventory && app.engine.state.raidInventory.groupPotions) ?? 1})</span>
                                    </button>
                                    ${hasDownedPlayers ? `
                                        <button class="glow-button accent raid-action-btn" id="btn-action-revive">
                                            <span class="btn-text">${RaidBattleUI.getSvgIcon('sparkles')} AJUDAR AMIGO</span>
                                        </button>
                                    ` : ''}
                                </div>
                            ` : isPartyPhase && hasActed ? `
                                <div class="waiting-turn-notice">
                                    <span class="turn-owner-indicator" style="color:#a7f3d0;">
                                        ✓ AÇÃO CONCLUÍDA! Aguardando os aliados e o turno do Boss...
                                    </span>
                                </div>
                            ` : isBossPhase && isTargeted ? `
                                <div class="action-buttons-group reaction-group">
                                    <span class="reaction-prompt">ESCOLHA SUA REAÇÃO:</span>
                                    <button class="glow-button accent raid-action-btn" id="btn-react-counter">
                                        <span class="btn-text">${RaidBattleUI.getSvgIcon('shield')} CONTRA-GOLPE</span>
                                    </button>
                                    <button class="glow-button primary raid-action-btn" id="btn-react-dodge">
                                        <span class="btn-text">${RaidBattleUI.getSvgIcon('wind')} ESQUIVAR</span>
                                    </button>
                                    <button class="glow-button secondary raid-action-btn" id="btn-react-item">
                                        <span class="btn-text">${RaidBattleUI.getSvgIcon('flask')} ITEM DEFENSIVO</span>
                                    </button>
                                </div>
                            ` : isBossPhase ? `
                                <div class="waiting-turn-notice">
                                    <span class="turn-owner-indicator" style="color:#f87171;">
                                        TURNO DO BOSS: O chefe está atacando a party!
                                    </span>
                                </div>
                            ` : `
                                <div class="waiting-turn-notice">
                                    <span class="turn-owner-indicator">
                                        FASE ATUAL: <strong>${isPartyPhase ? 'TURNO DA PARTY' : 'TURNO DO BOSS'}</strong>
                                    </span>
                                </div>
                            `}
                        </div>

                        <!-- Terminal de Execução (SEMPRE EMBAIXO DOS BOTÕES DE ATACAR/AÇÕES) -->
                        <div class="battle-terminal-section">
                            <div class="terminal-tabs">
                                <button class="terminal-tab active" id="raid-term-tab-output" data-tab="output">Saída</button>
                                <button class="terminal-tab" id="raid-term-tab-tests" data-tab="tests">Testes</button>
                            </div>
                            <div class="terminal-panel active" id="raid-panel-output">
                                <div class="terminal-content" id="raid-terminal-output">
                                    <div class="terminal-line system">[ SISTEMA ] Terminal pronto. Escolha uma ação para iniciar o turno.</div>
                                </div>
                            </div>
                            <div class="terminal-panel" id="raid-panel-tests" style="display:none;">
                                <div class="terminal-content" id="raid-test-results">
                                    <div class="terminal-line system">[ SISTEMA ] Clique em "Submeter" para validar o código no turno.</div>
                                </div>
                            </div>
                            <!-- Painéis de Dicas e Cheatsheet mantidos ocultos no DOM para compatibilidade -->
                            <div id="raid-panel-hints" style="display:none;"><div id="raid-hints-content"></div></div>
                            <div id="raid-panel-cheatsheet" style="display:none;"><div id="raid-cheatsheet-content"></div></div>
                        </div>
                    </div>

                    <!-- COLUNA DIREITA: ESPAÇO SEMPRE APARECENDO COM MISSÃO E IDE/EDITOR -->
                    <div class="battle-right-column">
                        <div class="battle-workspace-container">
                            <!-- Painel de Missão do Turno / Saída Esperada -->
                            <div class="battle-problem-panel" id="challenge-modal-left">
                                <div class="problem-section" id="raid-problem-section">
                                    <div style="display:flex;align-items:center;gap:0.5rem;margin-bottom:0.5rem;">
                                        <span class="challenge-action-badge" id="challenge-action-badge" style="background:rgba(56,189,248,0.2);border:1px solid #38bdf8;color:#38bdf8;font-size:0.68rem;font-weight:800;padding:2px 6px;border-radius:4px;">AGUARDANDO AÇÃO</span>
                                        <span class="challenge-origin-badge" id="challenge-origin-badge" style="background:rgba(168,85,247,0.2);border:1px solid #a855f7;color:#c084fc;font-size:0.68rem;font-weight:700;padding:2px 6px;border-radius:4px;">RAID POOL</span>
                                    </div>
                                    <h4 id="challenge-modal-title" style="color:var(--cyan, #38bdf8);margin:0 0 0.4rem 0;font-size:0.85rem;letter-spacing:0.06em;">DESAFIO DE PROGRAMAÇÃO C</h4>
                                    <div class="story-block" style="margin-bottom:0.6rem;background:rgba(255,255,255,0.02);border-left:3px solid var(--purple-bright,#a855f7);padding:0.6rem 0.8rem;border-radius:4px;">
                                        <div class="character-block-body" id="raid-challenge-instruction" style="font-size:0.82rem;color:#e2e8f0;line-height:1.45;">
                                            Selecione uma ação (Atacar, Item, Esquivar ou Contra-Golpe) para carregar o desafio de código do seu turno.
                                        </div>
                                    </div>
                                    <div class="expected-output-box" id="raid-expected-output-box"></div>
                                </div>
                            </div>

                            <!-- Painel do Editor C (IDE - Desabilitada enquanto escolhe ação) -->
                            <div class="battle-editor-panel ${!this.activeChallenge ? 'is-disabled' : ''}" id="battle-editor-panel">
                                <div class="editor-disabled-overlay" id="editor-disabled-overlay">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                                    <span>ESCOLHA UMA AÇÃO NO PAINEL PARA DESBLOQUEAR A IDE</span>
                                </div>
                                <div class="battle-editor-header">
                                    <div class="editor-tabs">
                                        <span class="editor-tab active" style="color:var(--cyan,#38bdf8);font-family:var(--font-code,monospace);font-size:0.8rem;display:flex;align-items:center;gap:0.4rem;">
                                            main.c
                                        </span>
                                    </div>
                                    <div class="editor-actions" style="display:flex;gap:0.4rem;align-items:center;">
                                        <button id="btn-raid-editor-format" class="editor-btn" title="Formatar Código (Indentação)" onclick="window.app?.ui?.formatCurrentEditor()">
                                            ✨ Formatar
                                        </button>
                                        <button id="btn-raid-editor-reset" class="editor-btn" title="Resetar Código">
                                            ${RaidBattleUI.getSvgIcon('refresh')} Reset
                                        </button>
                                        <button id="btn-raid-editor-run" class="editor-btn primary" title="Executar no Terminal (Ctrl+Enter)">
                                            ▶ Executar
                                        </button>
                                        <button id="btn-raid-editor-submit" class="editor-btn accent" title="Submeter e Resolver Turno (Ctrl+Shift+Enter)">
                                            ${RaidBattleUI.getSvgIcon('check')} Submeter
                                        </button>
                                        <button id="btn-challenge-notepad" class="editor-btn glossary-btn" title="Abrir Grimório de Anotações">
                                            ${RaidBattleUI.getSvgIcon('book')}
                                            <span>Grimório</span>
                                        </button>
                                    </div>
                                </div>
                                <div class="battle-editor-wrapper">
                                    <div class="line-numbers" id="raid-line-numbers"></div>
                                    <div class="editor-code-container">
                                        <pre class="editor-highlight" id="raid-editor-highlight" aria-hidden="true"><code style="font-family:inherit;"></code></pre>
                                        <textarea id="raid-code-editor" class="code-editor" spellcheck="false" autocomplete="off" autocorrect="off" autocapitalize="off" placeholder="// Seu código C de combate aparecerá aqui..." ${!this.activeChallenge ? 'disabled' : ''}></textarea>
                                    </div>
                                </div>
                            </div>

                            <!-- Drawer Lateral do Grimório Integrado ao Editor -->
                            <aside class="battle-notepad-drawer hidden" id="raid-modal-notepad-drawer">
                                <div class="activity-drawer-header" style="display:flex;justify-content:space-between;align-items:center;padding:0.5rem 0.7rem;background:#0c101a;border-bottom:1px solid rgba(255,255,255,0.08);">
                                    <div class="activity-drawer-title-group">
                                        <div class="activity-drawer-title" style="color:var(--gold-bright,#f59e0b);font-size:0.75rem;font-weight:700;display:flex;align-items:center;gap:0.4rem;">
                                            ${RaidBattleUI.getSvgIcon('book')}
                                            <span>GRIMÓRIO</span>
                                        </div>
                                    </div>
                                    <button class="activity-drawer-close" id="btn-close-raid-modal-notepad" style="background:none;border:none;color:#94a3b8;cursor:pointer;display:flex;align-items:center;justify-content:center;" title="Fechar Grimório">
                                        ${RaidBattleUI.getSvgIcon('close')}
                                    </button>
                                </div>
                                <div class="notepad-drawer-body">
                                    <textarea id="raid-modal-notepad-input" class="player-notepad-textarea" placeholder="Anotações salvas na conta..."></textarea>
                                </div>
                            </aside>
                        </div>
                    </div>
                </div>

                <!-- Modal Temático de Confirmação de Desistência da Raid -->
                <div id="modal-surrender-raid" class="modal hidden">
                    <div class="modal-backdrop" id="backdrop-surrender-raid"></div>
                    <div class="modal-content" style="max-width:440px;text-align:center;border-color:rgba(239,68,68,0.6);box-shadow:0 0 25px rgba(239,68,68,0.4);">
                        <div style="font-size:2.2rem;color:#ef4444;margin-bottom:0.6rem;">
                            ${RaidBattleUI.getSvgIcon('warning')}
                        </div>
                        <h3 class="modal-title" style="color:#f87171;font-family:var(--font-orbitron,sans-serif);font-size:1.15rem;margin-bottom:0.5rem;letter-spacing:0.06em;">
                            DESISTIR DA BATALHA?
                        </h3>
                        <p style="color:#cbd5e1;font-size:0.85rem;line-height:1.5;margin-bottom:1.4rem;">
                            Você está prestes a abandonar o combate contra <strong>${boss.name}</strong>. Seu progresso neste combate será encerrado e você retornará ao mapa da ascensão.
                        </p>
                        <div style="display:flex;gap:0.8rem;justify-content:center;">
                            <button id="btn-cancel-surrender" class="glow-button secondary" style="min-width:110px;">
                                <span class="btn-text">CONTINUAR</span>
                            </button>
                            <button id="btn-confirm-surrender" class="glow-button accent" style="min-width:120px;background:rgba(220,38,38,0.25);border-color:#ef4444;color:#fee2e2;">
                                <span class="btn-text">SIM, DESISTIR</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Inicializa o Editor C com Highlighting e Sincronização
        const editor = document.getElementById('raid-code-editor');
        if (editor) {
            editor.value = this.activeChallenge ? (this.activeChallenge.starterCode || '#include <stdio.h>\n\nint main() {\n    return 0;\n}') : '#include <stdio.h>\n\nint main() {\n    return 0;\n}';
            if (typeof app !== 'undefined' && app.ui && app.ui.attachCodeEditor) {
                app.ui.attachCodeEditor(editor, 'raid-line-numbers', 'raid-editor-highlight');
            }
        }

        // Configuração das Abas do Terminal
        this.setupTerminalTabs();

        // Configuração do Grimório Integrado ao Editor
        const btnModalNotepad = document.getElementById('btn-challenge-notepad');
        const modalDrawer = document.getElementById('raid-modal-notepad-drawer');
        const modalNotepadInput = document.getElementById('raid-modal-notepad-input');
        const btnCloseModalNotepad = document.getElementById('btn-close-raid-modal-notepad');

        if (modalNotepadInput && typeof app !== 'undefined' && app.engine) {
            modalNotepadInput.value = app.engine.getNotepad() || '';
            modalNotepadInput.oninput = () => {
                app.engine.setNotepad(modalNotepadInput.value);
            };
        }

        if (btnModalNotepad && modalDrawer) {
            btnModalNotepad.onclick = () => {
                modalDrawer.classList.toggle('hidden');
                if (!modalDrawer.classList.contains('hidden') && modalNotepadInput) {
                    setTimeout(() => modalNotepadInput.focus(), 100);
                }
            };
        }

        if (btnCloseModalNotepad && modalDrawer) {
            btnCloseModalNotepad.onclick = () => modalDrawer.classList.add('hidden');
        }

        // Botão Reset do Editor
        const btnReset = document.getElementById('btn-raid-editor-reset');
        if (btnReset && editor) {
            btnReset.onclick = () => {
                editor.value = this.activeChallenge ? (this.activeChallenge.starterCode || '') : '#include <stdio.h>\n\nint main() {\n    return 0;\n}';
                if (typeof app !== 'undefined' && app.ui && app.ui.attachCodeEditor) {
                    app.ui.attachCodeEditor(editor, 'raid-line-numbers', 'raid-editor-highlight');
                }
            };
        }

        // Botão Executar (roda CInterpreter e mostra saída)
        const btnRun = document.getElementById('btn-raid-editor-run');
        if (btnRun && editor) {
            btnRun.onclick = () => {
                const tabOutput = document.getElementById('raid-term-tab-output');
                if (tabOutput) tabOutput.click();
                const termOutput = document.getElementById('raid-terminal-output');
                const code = editor.value;
                if (termOutput) {
                    termOutput.innerHTML = '<div class="terminal-line system">[ SISTEMA ] Compilando e executando código...</div>';
                }

                if (typeof CInterpreter !== 'undefined') {
                    const interp = new CInterpreter();
                    const testIn = (this.activeChallenge && this.activeChallenge.tests && this.activeChallenge.tests[0]) ? this.activeChallenge.tests[0].input : '';
                    const res = interp.execute ? interp.execute(code, testIn) : interp.run(code);
                    if (termOutput) {
                        termOutput.innerHTML = '';
                        if (res.output) {
                            res.output.split('\n').forEach(line => {
                                if (!line.trim()) return;
                                const div = document.createElement('div');
                                div.className = 'terminal-line narrative';
                                div.textContent = line;
                                termOutput.appendChild(div);
                            });
                        }
                        if (res.errors && res.errors.length > 0) {
                            res.errors.forEach(err => {
                                const div = document.createElement('div');
                                div.className = 'terminal-line error';
                                div.textContent = typeof err === 'string' ? `[ ERRO ] ${err}` : `[ ERRO L.${err.line || 1} ] ${err.message || 'Erro de sintaxe'}`;
                                termOutput.appendChild(div);
                            });
                        } else if (!res.output) {
                            termOutput.innerHTML = '<div class="terminal-line success">[ SUCESSO ] Código executado com retorno 0 (sem saída de texto).</div>';
                        }
                    }
                }
            };
        }

        // Modal e Botão Desistir da Batalha
        const btnSurrender = document.getElementById('btn-surrender-raid');
        const modalSurrender = document.getElementById('modal-surrender-raid');
        const btnCancelSurrender = document.getElementById('btn-cancel-surrender');
        const btnConfirmSurrender = document.getElementById('btn-confirm-surrender');
        const backdropSurrender = document.getElementById('backdrop-surrender-raid');

        if (btnSurrender && modalSurrender) {
            btnSurrender.onclick = () => {
                modalSurrender.classList.remove('hidden');
            };

            const closeSurrenderModal = () => {
                modalSurrender.classList.add('hidden');
            };

            if (btnCancelSurrender) btnCancelSurrender.onclick = closeSurrenderModal;
            if (backdropSurrender) backdropSurrender.onclick = closeSurrenderModal;

            if (btnConfirmSurrender) {
                btnConfirmSurrender.onclick = () => {
                    closeSurrenderModal();
                    if (onSurrender) {
                        onSurrender();
                    }
                };
            }
        }

        // Botão Submeter
        const btnSubmit = document.getElementById('btn-raid-editor-submit');
        if (btnSubmit && editor) {
            btnSubmit.onclick = () => {
                if (this.currentSubmitHandler) {
                    const code = editor.value;
                    this.currentSubmitHandler(code);
                }
            };
        }

        // Ações Ofensivas
        const btnAtk = document.getElementById('btn-action-attack');
        if (btnAtk) btnAtk.onclick = () => {
            if (this.isActionLocked) return;
            onActionSelect('attack');
        };

        const btnItem = document.getElementById('btn-action-item');
        if (btnItem) btnItem.onclick = () => {
            if (this.isActionLocked) return;
            onActionSelect('item');
        };

        const btnItemGroup = document.getElementById('btn-action-item-group');
        if (btnItemGroup) btnItemGroup.onclick = () => {
            if (this.isActionLocked) return;
            onActionSelect('item_group');
        };

        const btnRevive = document.getElementById('btn-action-revive');
        if (btnRevive) btnRevive.onclick = () => {
            if (this.isActionLocked) return;
            onActionSelect('revive');
        };

        // Reações Defensivas
        const btnCounter = document.getElementById('btn-react-counter');
        if (btnCounter) btnCounter.onclick = () => {
            if (this.isActionLocked) return;
            onDefensiveReaction('counter');
        };

        const btnDodge = document.getElementById('btn-react-dodge');
        if (btnDodge) btnDodge.onclick = () => {
            if (this.isActionLocked) return;
            onDefensiveReaction('dodge');
        };

        const btnReactItem = document.getElementById('btn-react-item');
        if (btnReactItem) btnReactItem.onclick = () => {
            if (this.isActionLocked) return;
            onDefensiveReaction('item');
        };
    }

    /**
     * Trava ou destrava os botões de ação para evitar trocas sucessivas
     */
    setActionButtonsLocked(locked) {
        this.isActionLocked = !!locked;
        const actionDock = document.getElementById('battle-action-dock');
        if (actionDock) {
            const buttons = actionDock.querySelectorAll('.raid-action-btn');
            buttons.forEach(btn => {
                btn.disabled = this.isActionLocked;
                if (this.isActionLocked) {
                    btn.classList.add('disabled');
                    btn.style.opacity = '0.5';
                    btn.style.pointerEvents = 'none';
                } else {
                    btn.classList.remove('disabled');
                    btn.style.opacity = '1';
                    btn.style.pointerEvents = 'auto';
                }
            });
        }
    }

    /**
     * Configura as abas do terminal na tela de combate
     */
    setupTerminalTabs() {
        const tabButtons = this.container.querySelectorAll('.battle-terminal-section .terminal-tab');
        const panels = {
            output: document.getElementById('raid-panel-output'),
            tests: document.getElementById('raid-panel-tests'),
            hints: document.getElementById('raid-panel-hints'),
            cheatsheet: document.getElementById('raid-panel-cheatsheet')
        };

        tabButtons.forEach(btn => {
            btn.onclick = () => {
                const tabKey = btn.dataset.tab;
                tabButtons.forEach(b => b.classList.remove('active'));
                Object.values(panels).forEach(p => {
                    if (p) {
                        p.classList.remove('active');
                        p.style.display = 'none';
                    }
                });
                btn.classList.add('active');
                if (panels[tabKey]) {
                    panels[tabKey].classList.add('active');
                    panels[tabKey].style.display = 'flex';
                }
            };
        });
    }

    /**
     * Carrega a interface com os dados do desafio selecionado (IDE e Painel Direito)
     */
    openChallengeModal(challenge, actionType, onCodeSubmit) {
        this.activeChallenge = challenge;
        this.currentSubmitHandler = onCodeSubmit;

        const badge = document.getElementById('challenge-action-badge');
        const originBadge = document.getElementById('challenge-origin-badge');
        const title = document.getElementById('challenge-modal-title');
        const instruction = document.getElementById('raid-challenge-instruction');
        const expectedBox = document.getElementById('raid-expected-output-box');
        const editor = document.getElementById('raid-code-editor');
        const termOutput = document.getElementById('raid-terminal-output');
        const hintsContent = document.getElementById('raid-hints-content');
        const cheatsheetContent = document.getElementById('raid-cheatsheet-content');

        if (badge) badge.textContent = actionType.toUpperCase();
        if (originBadge) originBadge.textContent = challenge.origin || 'DESAFIO';
        if (title) title.textContent = challenge.title || 'DESAFIO DO TURNO';
        if (instruction) instruction.innerHTML = challenge.description || challenge.instruction || 'Complete o objetivo para executar a ação.';

        // Monta os Casos de Teste na coluna direita
        if (expectedBox) {
            const tests = challenge.tests || [];
            if (tests.length > 0) {
                const isSingleLine = !tests.some(t => String(t.expected).includes('\n'));
                const testListHtml = tests.slice(0, 3).map((t, idx) => `
                    <div class="expected-test-item" style="background:rgba(0,0,0,0.3);border:1px solid rgba(255,255,255,0.06);padding:0.35rem 0.5rem;margin-bottom:0.35rem;border-radius:4px;">
                        ${t.input ? `<div style="font-size:0.72rem;color:#94a3b8;"><strong>Entrada:</strong> <code>${String(t.input).replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></div>` : ''}
                        <div style="font-size:0.72rem;color:#38bdf8;"><strong>Esperado:</strong> <code style="color:#a7f3d0;">${String(t.expected).replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></div>
                    </div>
                `).join('');

                expectedBox.innerHTML = `
                    <div style="margin-top:0.6rem;background:rgba(15,23,42,0.8);border:1px solid rgba(56,189,248,0.25);border-radius:6px;padding:0.6rem 0.7rem;">
                        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.4rem;">
                            <strong style="color:#38bdf8;font-size:0.75rem;">SAÍDA ESPERADA</strong>
                            <span style="font-size:0.62rem;color:#94a3b8;border:1px solid rgba(255,255,255,0.15);padding:1px 4px;border-radius:3px;">
                                ${isSingleLine ? 'MESMA LINHA' : 'QUEBRAS (\\n)'}
                            </span>
                        </div>
                        <div>${testListHtml}</div>
                    </div>
                `;
            } else {
                expectedBox.innerHTML = '';
            }
        }

        // Configura código inicial no editor C
        if (editor) {
            editor.value = challenge.starterCode || '#include <stdio.h>\n\nint main() {\n    return 0;\n}';
            if (typeof app !== 'undefined' && app.ui && app.ui.attachCodeEditor) {
                app.ui.attachCodeEditor(editor, 'raid-line-numbers', 'raid-editor-highlight');
            }
            setTimeout(() => editor.focus(), 150);
        }

        // Preenche Dicas
        if (hintsContent) {
            const hints = challenge.hints || [];
            if (hints.length > 0) {
                hintsContent.innerHTML = hints.map((h, i) => {
                    const text = typeof h === 'string' ? h : (h.text || '');
                    return `<div class="terminal-line hint" style="margin-bottom:0.35rem;"><strong>[ DICA ${i + 1} ]:</strong> ${text}</div>`;
                }).join('');
            } else {
                hintsContent.innerHTML = '<div class="terminal-line hint">[ DICA ] Use printf formatado e retorne 0 ao final de main.</div>';
            }
        }

        // Preenche Guia C
        if (cheatsheetContent && typeof app !== 'undefined' && app.ui && app.ui.renderCheatsheet) {
            const originalCheatsheet = document.getElementById('activity-cheatsheet-content');
            if (originalCheatsheet && originalCheatsheet.innerHTML) {
                cheatsheetContent.innerHTML = originalCheatsheet.innerHTML;
            } else {
                cheatsheetContent.innerHTML = `
                    <div style="padding:0.5rem;font-size:0.72rem;color:#e2e8f0;line-height:1.4;">
                        <p style="margin:0.2rem 0;"><strong style="color:#38bdf8;">printf:</strong> <code>printf("Valor: %d\\n", x);</code></p>
                        <p style="margin:0.2rem 0;"><strong style="color:#38bdf8;">scanf:</strong> <code>scanf("%d", &x);</code></p>
                        <p style="margin:0.2rem 0;"><strong style="color:#38bdf8;">tipos:</strong> %d (int), %f (float), %s (string)</p>
                    </div>
                `;
            }
        }

        // Alterna para a aba Saída no início
        const tabOutput = document.getElementById('raid-term-tab-output');
        if (tabOutput) tabOutput.click();
        if (termOutput) termOutput.innerHTML = '<div class="terminal-line system">[ SISTEMA ] Desafio carregado. Escreva sua solução no editor e execute ou submeta!</div>';

        // Trava os botões de ação para impedir trocas e múltiplos cliques
        this.setActionButtonsLocked(true);

        // Desbloqueia e ativa a IDE / Editor C
        const editorPanel = document.getElementById('battle-editor-panel');
        if (editorPanel) editorPanel.classList.remove('is-disabled');
        if (editor) editor.removeAttribute('disabled');
    }

    closeChallengeModal() {
        this.currentSubmitHandler = null;
        this.activeChallenge = null;
        this.setActionButtonsLocked(false);

        // Bloqueia e desativa a IDE / Editor C enquanto aguarda nova ação
        const editorPanel = document.getElementById('battle-editor-panel');
        if (editorPanel) editorPanel.classList.add('is-disabled');
        const editorEl = document.getElementById('raid-code-editor');
        if (editorEl) editorEl.setAttribute('disabled', 'true');

        const timerVal = document.getElementById('challenge-timer-val');
        if (timerVal) timerVal.textContent = '--';
        const badge = document.getElementById('challenge-action-badge');
        if (badge) badge.textContent = 'AGUARDANDO AÇÃO';
        const originBadge = document.getElementById('challenge-origin-badge');
        if (originBadge) originBadge.textContent = 'RAID POOL';
        const title = document.getElementById('challenge-modal-title');
        if (title) title.textContent = 'DESAFIO DE PROGRAMAÇÃO C';
        const instruction = document.getElementById('raid-challenge-instruction');
        if (instruction) {
            instruction.textContent = 'Selecione uma ação (Atacar, Item, Esquivar ou Contra-Golpe) para carregar o desafio de código do seu turno.';
        }
        const expectedBox = document.getElementById('raid-expected-output-box');
        if (expectedBox) expectedBox.innerHTML = '';

        // Limpa o Editor C
        const editor = document.getElementById('raid-code-editor');
        if (editor) {
            editor.value = '';
            if (typeof app !== 'undefined' && app.ui && app.ui.attachCodeEditor) {
                app.ui.attachCodeEditor(editor, 'raid-line-numbers', 'raid-editor-highlight');
            }
        }

        // Limpa e reseta o Terminal
        const termOutput = document.getElementById('raid-terminal-output');
        if (termOutput) {
            termOutput.innerHTML = '<div class="terminal-line system">[ SISTEMA ] Terminal pronto. Escolha uma ação para iniciar o turno.</div>';
        }
        const testResults = document.getElementById('raid-test-results');
        if (testResults) {
            testResults.innerHTML = '<div class="terminal-line system">[ SISTEMA ] Clique em "Submeter" para validar o código no turno.</div>';
        }
    }

    updateChallengeTimer(seconds) {
        const timerVal = document.getElementById('challenge-timer-val');
        const timerBadge = document.getElementById('challenge-timer-badge');
        if (timerVal) timerVal.textContent = `${seconds}s`;
        if (timerBadge) {
            if (seconds <= 5) {
                timerBadge.classList.add('danger');
            } else {
                timerBadge.classList.remove('danger');
            }
        }
    }

    /**
     * Renderiza a Tela de Vitória com cálculo oficial de MVP (Seção 21)
     */
    renderVictoryScreen(raidData, boss, onClaimRewards) {
        if (!this.container) this.init();
        if (!this.container) return;

        const players = raidData.players || [];

        // Cálculo do MVP (Fórmula oficial Seção 21):
        // mvpScore = totalDamageDealt * 1.0 + totalSupportScore * 0.8 + successfulActions * 50 + revives * 300
        let mvpPlayer = players[0];
        let maxMvpScore = -1;
        let topDamagePlayer = players[0];
        let maxDamage = -1;
        let topTankPlayer = players[0];
        let maxDamageTaken = -1;
        let topSupportPlayer = players[0];
        let maxSupportScore = -1;

        players.forEach(p => {
            const dmg = p.damageDealt || 0;
            const tank = p.damageTaken || 0;
            const heal = p.healingDone || 0;
            const rev = p.revivesCount || 0;
            const acts = p.successfulActions || 0;

            const supportScore = heal + rev * 500;
            const score = dmg * 1.0 + supportScore * 0.8 + acts * 50 + rev * 300;

            if (score > maxMvpScore) {
                maxMvpScore = score;
                mvpPlayer = p;
            }
            if (dmg > maxDamage) {
                maxDamage = dmg;
                topDamagePlayer = p;
            }
            if (tank > maxDamageTaken) {
                maxDamageTaken = tank;
                topTankPlayer = p;
            }
            if (supportScore > maxSupportScore) {
                maxSupportScore = supportScore;
                topSupportPlayer = p;
            }
        });

        const baseXp = boss.rewards?.baseXp || 350;
        const baseTokens = boss.rewards?.baseTokens || 40;

        this.container.innerHTML = `
            <div class="boss-raid-wrapper victory-mode">
                <div class="victory-banner-box">
                    <div class="victory-rays"></div>
                    <div class="victory-trophy-icon">
                        ${RaidBattleUI.getSvgIcon('trophy')}
                    </div>
                    <h1 class="victory-headline">VITÓRIA ÉPICA!</h1>
                    <p class="victory-subline">O chefe <strong>${boss.name}</strong> foi subjugado pela sua Guilda!</p>

                    <!-- Painel de MVP e Destaques -->
                    <div class="mvp-highlight-card">
                        <div class="mvp-badge">${RaidBattleUI.getSvgIcon('star')} MVP DA RAID ${RaidBattleUI.getSvgIcon('star')}</div>
                        <img src="${mvpPlayer?.photoURL || 'assets/avatars/avatar_02.png'}" class="mvp-avatar" />
                        <div class="mvp-name">${mvpPlayer?.displayName || 'Codemancer'}</div>
                        <div class="mvp-score-tag">Pontuação Geral de MVP: ${Math.round(maxMvpScore)} pts</div>
                    </div>

                    <!-- Quadro de Honra dos Jogadores -->
                    <div class="hall-of-fame-grid">
                        <div class="fame-item">
                            <span class="fame-icon">${RaidBattleUI.getSvgIcon('sword')}</span>
                            <span class="fame-title">Maior Dano</span>
                            <strong class="fame-player">${topDamagePlayer?.displayName || 'Herói'}</strong>
                            <span class="fame-val">${topDamagePlayer?.damageDealt || 0} Dano (+10% XP)</span>
                        </div>
                        <div class="fame-item">
                            <span class="fame-icon">${RaidBattleUI.getSvgIcon('shield')}</span>
                            <span class="fame-title">Mais Dano Recebido</span>
                            <strong class="fame-player">${topTankPlayer?.displayName || 'Herói'}</strong>
                            <span class="fame-val">${topTankPlayer?.damageTaken || 0} Dano (+5% XP)</span>
                        </div>
                        <div class="fame-item">
                            <span class="fame-icon">${RaidBattleUI.getSvgIcon('heart')}</span>
                            <span class="fame-title">Maior Suporte</span>
                            <strong class="fame-player">${topSupportPlayer?.displayName || 'Herói'}</strong>
                            <span class="fame-val">${topSupportPlayer?.healingDone || 0} Cura / ${topSupportPlayer?.revivesCount || 0} Revives (+10% XP)</span>
                        </div>
                    </div>

                    <!-- Recompensas da Partida -->
                    <div class="victory-rewards-box">
                        <div class="reward-pill xp">${RaidBattleUI.getSvgIcon('lightning')} +${baseXp} XP de Ascensão</div>
                        <div class="reward-pill tokens">${RaidBattleUI.getSvgIcon('coin')} +${baseTokens} Tokens da Guilda</div>
                        ${boss.rewards?.title ? `<div class="reward-pill title">${RaidBattleUI.getSvgIcon('medal')} Título: "${boss.rewards.title}"</div>` : ''}
                    </div>

                    <button id="btn-claim-raid-rewards" class="glow-button primary" style="margin-top:1.5rem;font-size:1.1rem;padding:0.9rem 2.5rem;">
                        <span class="btn-text">RESGATAR RECOMPENSAS & CONTINUAR</span>
                        <span class="btn-glow"></span>
                    </button>
                </div>
            </div>
        `;

        if (window.raidAudio) {
            window.raidAudio.stopBattleMusic();
            window.raidAudio.playEvent('victory');
        }

        const btnClaim = document.getElementById('btn-claim-raid-rewards');
        if (btnClaim) {
            btnClaim.onclick = () => onClaimRewards(baseXp, baseTokens, boss);
        }
    }

    /**
     * Renderiza a Tela de Derrota
     */
    renderDefeatScreen(raidData, boss, onRetry, onLeave) {
        if (!this.container) this.init();
        if (!this.container) return;

        const bossState = raidData.bossState || boss;
        const hpPct = Math.max(0, Math.min(100, (bossState.currentHp / bossState.maxHp) * 100)).toFixed(1);

        this.container.innerHTML = `
            <div class="boss-raid-wrapper defeat-mode">
                <div class="defeat-box">
                    <div class="defeat-icon">
                        ${RaidBattleUI.getSvgIcon('skull')}
                    </div>
                    <h1 class="defeat-headline">TODOS OS HEROIS CAÍRAM</h1>
                    <p class="defeat-subline">A Party sucumbiu aos ataques de <strong>${boss.name}</strong>.</p>
                    <div class="defeat-boss-hp-tag">HP Restante do Chefe: <strong>${bossState.currentHp} / ${bossState.maxHp} (${hpPct}%)</strong></div>

                    <div class="defeat-tips-card">
                        <h4>${RaidBattleUI.getSvgIcon('lightbulb')} CONSELHO ESTRATÉGICO DA GUILDA</h4>
                        <p>Coordene com seus companheiros: utilize Esquiva em ataques individuais e Contra-Golpes quando a defesa permitir. Jogadores com subclasse <strong>Debugger</strong> possuem bônus passivo para reviver aliados caídos!</p>
                    </div>

                    <div class="defeat-buttons-row">
                        <button id="btn-defeat-retry" class="glow-button primary">
                            <span class="btn-text">${RaidBattleUI.getSvgIcon('refresh')} TENTAR NOVAMENTE</span>
                            <span class="btn-glow"></span>
                        </button>
                        <button id="btn-defeat-leave" class="glow-button secondary">
                            <span class="btn-text">${RaidBattleUI.getSvgIcon('back')} VOLTAR AO MAPA</span>
                        </button>
                    </div>
                </div>
            </div>
        `;

        if (window.raidAudio) {
            window.raidAudio.stopBattleMusic();
            window.raidAudio.playEvent('playerDown');
        }

        const btnRetry = document.getElementById('btn-defeat-retry');
        if (btnRetry) btnRetry.onclick = () => onRetry();

        const btnLeave = document.getElementById('btn-defeat-leave');
        if (btnLeave) btnLeave.onclick = () => onLeave();
    }
}

window.RaidBattleUI = RaidBattleUI;
window.raidUI = new RaidBattleUI();
