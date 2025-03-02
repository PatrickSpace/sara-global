 <template>
  <Profelayout>
    <template #contenido>
      <div class="container">
        <h2>Profesor</h2>
        <router-view></router-view>
      </div>
    </template>
  </Profelayout>
</template>
<script>
import Profelayout from "@/layouts/Profesorlayout.vue";
export default {
  components: {
    Profelayout,
  },
};
</script>