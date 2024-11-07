<script lang="ts" setup>
import { ref } from 'vue'
import { UserService } from '../store/user.service'
import { ApiUserRepository } from '../repositories/user.repository'

const userService = new UserService(new ApiUserRepository())
const user = ref(null)

async function loadUser() {
  const userId = '123'
  user.value = await userService.getUser(userId)
}

loadUser()
</script>
