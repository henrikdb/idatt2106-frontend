<template>
    <div class="tab-pane active" id="notification">
        <h6>VARSLINGSINNSTILLINGER</h6>
        <hr>
        <form>
            <div class="form-group">
                <label class="d-block mb-0">Sikkerhetsvarsler</label>
                <div class="small text-muted mb-3">Motta sikkerhetsvarselvarsler via e-post</div>
                <div class="custom-control custom-checkbox">
                    <input type="checkbox" class="custom-control-input" id="customCheck1">
                    <label class="custom-control-label" for="customCheck1">E-post hver gang en
                        sårbarhet blir funnet</label>
                </div>
                <div class="custom-control custom-checkbox">
                    <input type="checkbox" class="custom-control-input" id="customCheck2">
                    <label class="custom-control-label" for="customCheck2">E-post et sammendrag av
                        sårbarhet</label>
                </div>
            </div>
            <div class="form-group mb-0">
                <label class="d-block">SMS-varsler</label>
                <ul class="list-group list-group-sm">
                    <li class="list-group-item has-icon">
                        Kommentarer
                        <div class="custom-control custom-control-nolabel custom-switch ml-auto">
                            <input type="checkbox" class="custom-control-input" id="customSwitch1">
                            <label class="custom-control-label" for="customSwitch1"></label>
                        </div>
                    </li>
                    <li class="list-group-item has-icon">
                        Oppdateringer fra personer
                        <div class="custom-control custom-control-nolabel custom-switch ml-auto">
                            <input type="checkbox" class="custom-control-input" id="customSwitch2">
                            <label class="custom-control-label" for="customSwitch2"></label>
                        </div>
                    </li>
                    <li class="list-group-item has-icon">
                        Påminnelser
                        <div class="custom-control custom-control-nolabel custom-switch ml-auto">
                            <input type="checkbox" class="custom-control-input" id="customSwitch3">
                            <label class="custom-control-label" for="customSwitch3"></label>
                        </div>
                    </li>
                    <li class="list-group-item has-icon">
                        Hendelser
                        <div class="custom-control custom-control-nolabel custom-switch ml-auto">
                            <input type="checkbox" class="custom-control-input" id="customSwitch4">
                            <label class="custom-control-label" for="customSwitch4"></label>
                        </div>
                    </li>
                    <li class="list-group-item has-icon">
                        Sider du følger
                        <div class="custom-control custom-control-nolabel custom-switch ml-auto">
                            <input type="checkbox" class="custom-control-input" id="customSwitch5">
                            <label class="custom-control-label" for="customSwitch5"></label>
                        </div>
                    </li>
                </ul>
            </div>
        </form>
    </div>
</template>
