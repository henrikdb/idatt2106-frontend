<template>
    <div class="tab-pane active" id="billing">
        <h6>BILLING SETTINGS</h6>
        <hr>
        <form>
            <div class="form-group">
                <label class="d-block mb-0">Spending account</label>
                <select class="form-control form-control-lg">
                    <option>9175 5942 5431 5712</option>
                    <option>5175 5942 5431 5712</option>
                    <option>4175 5942 5431 5712</option>
                </select>
            </div>
            <div class="form-group">
                <label class="d-block mb-0">Savings account</label>
                <select class="form-control form-control-lg">
                    <option>2175 5942 5431 5712</option>
                    <option>1175 5942 5431 5712</option>
                </select>
                <br>
            </div>
            <hr>
            <div class="form-group mb-0">
                <label class="d-block">Payment History</label>
                <div class="border border-gray-500 bg-gray-200 p-3 text-center font-size-sm">You
                    have not made any payment.</div>
            </div>
        </form>
    </div>
</template>