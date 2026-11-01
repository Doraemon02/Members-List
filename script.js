document.addEventListener('DOMContentLoaded', () => {
    const API_BASE = 'https://http://78.154.103.16:16678/';

    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            
            const icon = mobileMenuBtn.querySelector('i');
            if (mobileMenu.classList.contains('hidden')) {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            } else {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            }
        });
    }

    if (mobileMenu) {
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                const icon = mobileMenuBtn ? mobileMenuBtn.querySelector('i') : null;
                if (icon) {
                    icon.classList.remove('fa-xmark');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }

    const pingElement = document.getElementById('bot-ping');
    const overallStatus = document.getElementById('overall-status');
    const statusList = document.getElementById('status-list');
    const statusManage = document.getElementById('status-manage');
    const statusBackup = document.getElementById('status-backup');

    const applyBadgeClass = (el, level) => {
        if (!el) return;
        el.classList.remove(
            'text-green-400', 'border-green-500', 'shadow-[0_0_5px_rgba(34,197,94,0.2)]',
            'text-yellow-400', 'border-yellow-500', 'shadow-[0_0_5px_rgba(234,179,8,0.2)]',
            'text-red-400', 'border-red-500', 'shadow-[0_0_5px_rgba(239,68,68,0.2)]'
        );
        if (level === 'green') {
            el.classList.add('text-green-400', 'border-green-500', 'shadow-[0_0_5px_rgba(34,197,94,0.2)]');
        } else if (level === 'yellow') {
            el.classList.add('text-yellow-400', 'border-yellow-500', 'shadow-[0_0_5px_rgba(234,179,8,0.2)]');
        } else {
            el.classList.add('text-red-400', 'border-red-500', 'shadow-[0_0_5px_rgba(239,68,68,0.2)]');
        }
    };

    const levelFromStatus = (statusText) => {
        const t = (statusText || '').toString();
        if (!t || t === '不可用' || /error|offline|fail|down/i.test(t)) return 'red';
        if (t === '運行中' || t === '正常運行' || t === '正常運行中' || /online|ok|running|up/i.test(t)) return 'green';
        return 'yellow';
    };

    const setBorderL = (el, level) => {
        if (!el) return;
        el.classList.remove('border-l-green-500', 'border-l-yellow-500', 'border-l-red-500');
        el.classList.add(
            level === 'green' ? 'border-l-green-500' :
            level === 'yellow' ? 'border-l-yellow-500' : 'border-l-red-500'
        );
    };

    const setStatusColors = (level) => {
        const titleIcon = document.querySelector('#status .fa-chart-simple');
        const titleText = document.querySelector('#status h2');
        const outerDot = document.querySelector('#status .animate-ping, #status span.absolute.inline-flex');
        const innerDot = document.querySelector('#status span.relative.inline-flex.rounded-full');
        const divider = document.querySelector('#status .h-\\[2px\\].w-full');
        const pingCard = document.getElementById('bot-ping') && document.getElementById('bot-ping').parentElement && document.getElementById('bot-ping').parentElement.parentElement;
        const cardHover = document.querySelector('#status .relative.overflow-hidden.group');
        const pingNum = document.getElementById('bot-ping');
        const pingMs = pingNum && pingNum.nextElementSibling;

        if (overallStatus) overallStatus.classList.remove('text-green-400', 'text-yellow-400', 'text-red-400');
        if (titleIcon) titleIcon.classList.remove('text-green-400', 'text-yellow-400', 'text-red-400');
        if (titleText) titleText.classList.remove('text-green-400', 'text-yellow-400', 'text-red-400');
        if (outerDot) outerDot.classList.remove('bg-green-400', 'bg-yellow-400', 'bg-red-400');
        if (innerDot) innerDot.classList.remove('bg-green-500', 'bg-yellow-500', 'bg-red-500');
        if (pingNum) pingNum.classList.remove('text-green-400', 'text-yellow-400', 'text-red-400');
        if (pingMs) pingMs.classList.remove('text-green-400', 'text-yellow-400', 'text-red-400');
        if (pingCard && pingCard.classList.contains('group')) pingCard.classList.remove('bg-green-500/5', 'bg-yellow-500/5', 'bg-red-500/5');
        if (cardHover && cardHover.classList.contains('absolute') && cardHover.classList.contains('inset-0')) cardHover.classList.remove('bg-green-500/5', 'bg-yellow-500/5', 'bg-red-500/5');

        let c1, c2, c3, dotGlow, pingGlow, pingGlow2;
        if (level === 'green') {
            c1 = 'text-green-400'; c2 = 'bg-green-400'; c3 = 'bg-green-500';
            dotGlow = 'rgba(34,197,94,0.8)';
            pingGlow = 'rgba(34,197,94,0.6)';
            pingGlow2 = 'rgba(34,197,94,0.4)';
        } else if (level === 'yellow') {
            c1 = 'text-yellow-400'; c2 = 'bg-yellow-400'; c3 = 'bg-yellow-500';
            dotGlow = 'rgba(234,179,8,0.8)';
            pingGlow = 'rgba(234,179,8,0.6)';
            pingGlow2 = 'rgba(234,179,8,0.4)';
        } else {
            c1 = 'text-red-400'; c2 = 'bg-red-400'; c3 = 'bg-red-500';
            dotGlow = 'rgba(239,68,68,0.8)';
            pingGlow = 'rgba(239,68,68,0.6)';
            pingGlow2 = 'rgba(239,68,68,0.4)';
        }
        if (overallStatus) overallStatus.classList.add(c1);
        if (titleIcon) titleIcon.classList.add(c1);
        if (titleText) titleText.classList.add(c1);
        if (outerDot) outerDot.classList.add(c2);
        if (innerDot) {
            innerDot.classList.add(c3);
            innerDot.style.boxShadow = `0 0 8px ${dotGlow}`;
        }
        if (pingNum) {
            pingNum.classList.add(c1);
            pingNum.style.filter = `drop-shadow(0 0 15px ${pingGlow})`;
        }
        if (pingMs) {
            pingMs.classList.add(c1);
            pingMs.style.filter = `drop-shadow(0 0 10px ${pingGlow2})`;
        }
        if (divider) {
            if (level === 'green') {
                divider.className = 'h-[2px] w-full bg-gradient-to-r from-green-600 via-green-400 to-green-600 shadow-[0_0_10px_rgba(34,197,94,0.8)] mb-8 rounded-full';
            } else if (level === 'yellow') {
                divider.className = 'h-[2px] w-full bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-600 shadow-[0_0_10px_rgba(234,179,8,0.8)] mb-8 rounded-full';
            } else {
                divider.className = 'h-[2px] w-full bg-gradient-to-r from-red-600 via-red-400 to-red-600 shadow-[0_0_10px_rgba(239,68,68,0.8)] mb-8 rounded-full';
            }
        }
        const listCard = statusList && statusList.closest('.bg-\\[\\#0b1016\\]');
        const manageCard = statusManage && statusManage.closest('.bg-\\[\\#0b1016\\]');
        const backupCard = statusBackup && statusBackup.closest('.bg-\\[\\#0b1016\\]');
        const allCards = [listCard, manageCard, backupCard];
        allCards.forEach(c => { if (c) {
            c.classList.remove('bg-green-500/5', 'bg-yellow-500/5', 'bg-red-500/5');
        }});
    };

    const setUnavailable = () => {
        if (pingElement) pingElement.textContent = '---';
        if (overallStatus) overallStatus.textContent = '整體狀態：不可用';
        if (statusList) statusList.textContent = '不可用';
        if (statusManage) statusManage.textContent = '不可用';
        if (statusBackup) statusBackup.textContent = '不可用';
        applyBadgeClass(statusList, 'red');
        applyBadgeClass(statusManage, 'red');
        applyBadgeClass(statusBackup, 'red');
        setStatusColors('red');
        const listCard = statusList && statusList.closest('.bg-\\[\\#0b1016\\]');
        const manageCard = statusManage && statusManage.closest('.bg-\\[\\#0b1016\\]');
        const backupCard = statusBackup && statusBackup.closest('.bg-\\[\\#0b1016\\]');
        setBorderL(listCard, 'red');
        setBorderL(manageCard, 'red');
        setBorderL(backupCard, 'red');
    };

    const fetchRealStatus = async () => {
        try {
            const response = await fetch(API_BASE + '/api/status', { signal: AbortSignal.timeout ? AbortSignal.timeout(8000) : undefined });
            if (!response.ok) throw new Error('HTTP ' + response.status);
            const data = await response.json();

            const pingRaw = data.ping;
            const pingNum = (typeof pingRaw === 'number') ? pingRaw : (typeof pingRaw === 'string' && !isNaN(Number(pingRaw)) ? Number(pingRaw) : null);
            if (pingElement) {
                pingElement.textContent = (pingNum != null) ? pingNum : '---';
            }

            const rawStatus = (data.status || '').toString();
            let overallText;
            if (rawStatus === 'online' || /online|ok|running|up/i.test(rawStatus)) {
                overallText = '整體狀態：正常運行';
            } else if (rawStatus && rawStatus !== 'offline') {
                overallText = '整體狀態：' + rawStatus;
            } else {
                overallText = '整體狀態：不可用';
            }
            if (overallStatus) overallStatus.textContent = overallText;

            const modules = data.modules || {};
            const listTxt = modules.list ? modules.list : '不可用';
            const manageTxt = modules.manage ? modules.manage : '不可用';
            const backupTxt = modules.backup ? modules.backup : '不可用';
            if (statusList) statusList.textContent = listTxt;
            if (statusManage) statusManage.textContent = manageTxt;
            if (statusBackup) statusBackup.textContent = backupTxt;

            const overallLevel = levelFromStatus(
                overallText.replace('整體狀態：', '')
            );
            applyBadgeClass(statusList, levelFromStatus(listTxt));
            applyBadgeClass(statusManage, levelFromStatus(manageTxt));
            applyBadgeClass(statusBackup, levelFromStatus(backupTxt));
            setStatusColors(overallLevel);

            const listCard = statusList && statusList.closest('.bg-\\[\\#0b1016\\]');
            const manageCard = statusManage && statusManage.closest('.bg-\\[\\#0b1016\\]');
            const backupCard = statusBackup && statusBackup.closest('.bg-\\[\\#0b1016\\]');
            setBorderL(listCard, levelFromStatus(listTxt));
            setBorderL(manageCard, levelFromStatus(manageTxt));
            setBorderL(backupCard, levelFromStatus(backupTxt));

        } catch (error) {
            console.log('API 無法連線：', error && error.message ? error.message : error);
            setUnavailable();
        }
    };

    if (pingElement) {
        setUnavailable();
        fetchRealStatus();
        setInterval(fetchRealStatus, 10000);
    }
});
