<script lang="ts">
    export let label: string;
    export let value: string;
</script>

<div class="person-card-info">
    <h4>{label}</h4>
    <p>{value}</p>
</div>

<style>
    .person-card-info {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
    }
    h4 {
        width: 100px;
        font-weight: bold;
        color: #014d79be;
        padding-block: 0.3rem;
    }
</style>
