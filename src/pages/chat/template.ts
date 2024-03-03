const tmp = `
    <main class="chat">
        <div class="chat__wrapper">
            <div class="chat__sidebar">
                <div class="chat__user-settings">
                    {{{ userSettingsButton }}}
                </div>
                {{{ chatSearch }}}
                {{{ chatItemList }}}
            </div>
            <div class="chat__window">
                <div class="chat__window-header">
                    <div class="chat__window-header-user">
                        Alex
                    </div>
                </div>
                <div class="chat__window-body">
                    <div class="chat__messages-wrapper">
                        <div class="chat__message">
                            <nav> {{{ nav }}} </nav>
                        </div>
                    </div>
                </div>
                {{{ messageSendForm }}}
            </div>
        </div>
    </main>
`;

export default tmp;
