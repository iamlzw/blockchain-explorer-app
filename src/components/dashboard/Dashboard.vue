<template>
    <div class="dashboard">
        <base-info></base-info>
        <peer-block-info></peer-block-info>
        <tx-info></tx-info>
    </div>
</template>

<script>
import BaseInfo from '@/components/dashboard/BaseInfo'
import PeerBlockInfo from '@/components/dashboard/PeerBlockInfo'
import TxInfo from '@/components/dashboard/TxInfo'
export default {
  name: 'Dashboard',
  components: {
    'baseInfo': BaseInfo,
    'peerBlockInfo': PeerBlockInfo,
    'txInfo': TxInfo
  }
}
</script>

<style scoped>
    .dashboard{
        margin-left: 200px;
        margin-right: 200px;
    }
</style>
