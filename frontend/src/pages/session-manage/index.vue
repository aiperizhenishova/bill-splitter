<script setup lang="ts">
import AppHeader from '@/widgets/app-header/index.vue';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import {
  IconCopyFilled,
  IconSquareRoundedFilled,
  IconChevronLeft,
  IconPencilFilled,
  IconTrashFilled,
  IconPointFilled,
  IconBowlSpoonFilled,
} from '@tabler/icons-vue';
import { useSessionSummary } from '@/entities/session';
import { useShareLink } from '@/features/share-link';
import BaseButton from '@/shared/ui/BaseButton.vue';
import ConfirmModal from '@/shared/ui/ConfirmModal.vue';
import router from '@/app/router';
import { useDishes } from '@/features/manage-dishes';
import { Dish } from '@/entities/dish';
import { api } from '@/shared/api/instance';
import BaseInput from '@/shared/ui/BaseInput.vue';
import { useToast } from 'vue-toastification';
import QrUpload from '@/widgets/qr-upload/index.vue';

defineOptions({ name: 'SessionManagePage' });

const route = useRoute();
const sessionId = route.params.sessionId as string;
const sessionIdRef = ref(sessionId);
const {
  dishes,
  loading: dishesLoading,
  getDishes,
  addDish,
  editDish,
  deleteDish,
} = useDishes(sessionIdRef);
const { summary, loading, getSummary, finishSession } =
  useSessionSummary(sessionId);
const { copyLink } = useShareLink();
const showFinishModal = ref(false);
const newDishName = ref('');
const newDishPrice = ref<number | null>(null);
const editingDishId = ref<number | null>(null);
const isEditingName = ref(false);
const editedName = ref('');
const showQrCode = ref(false);
const toast = useToast();

async function handleFinish() {
  const ok = await finishSession();
  if (ok) {
    router.push('/dashboard');
  }
}

function getParticipantText(count: number) {
  if (count % 10 === 1 && count % 100 !== 11) {
    return 'участник';
  }

  if ([2, 3, 4].includes(count % 10) && ![12, 13, 14].includes(count % 100)) {
    return 'участника';
  }

  return 'участников';
}

function goBack() {
  router.push('/dashboard');
}

async function handleAddDish() {
  if (!newDishName.value || !newDishPrice.value) return;
  await addDish(newDishName.value, Number(newDishPrice.value));
  newDishName.value = '';
  newDishPrice.value = null;
}

function startEdit(dish: Dish) {
  editingDishId.value = dish.id;
  newDishName.value = dish.name;
  newDishPrice.value = Number(dish.price);
}

async function handleSaveEdit() {
  if (editingDishId.value === null || !newDishName.value || !newDishPrice.value)
    return;
  await editDish({
    id: editingDishId.value,
    name: newDishName.value,
    price: Number(newDishPrice.value),
  });
  editingDishId.value = null;
  newDishName.value = '';
  newDishPrice.value = null;
}

async function handleDeleteDish(id: number) {
  await deleteDish(id);
}

function cancelEdit() {
  editingDishId.value = null;
  newDishName.value = '';
  newDishPrice.value = null;
}

function startEditName() {
  editedName.value = summary.value!.sessionName;
  isEditingName.value = true;
}

async function saveEditName() {
  await api.patch(`/sessions/${sessionId}/name`, { name: editedName.value });
  isEditingName.value = false;
  await getSummary();
}

async function onQrUpload(e: globalThis.Event) {
  const input = e.target as globalThis.HTMLInputElement;
  const file = input.files?.[0];
  if (!file) return;

  const formData = new globalThis.FormData();
  formData.append('file', file);

  try {
    const { data } = await api.post(`/sessions/${sessionId}/qr`, formData);
    if (data?.qrUrl) await getSummary();
  } catch (e) {
    toast.error(e instanceof Error ? e.message : 'не удалось загрузить QR код');
  }
}

onMounted(async () => {
  await getSummary();
  await getDishes();
});
</script>

<template>
  <div class="session-manage-page">
    <AppHeader>
      <BaseButton
        variant="icon"
        size="md"
        @click="goBack()"
        class="session-manage-page__button session-manage-page__button--back"
      >
        <IconChevronLeft />
      </BaseButton>
    </AppHeader>

    <div v-if="summary" class="session-manage-page__content">
      <div class="session-manage-page__heading">
        <div class="session-manage-page__title-row">
          <h2
            v-if="!isEditingName"
            @click="startEditName"
            class="session-manage-page__name"
          >
            {{ summary.sessionName }}
          </h2>
          <div v-else class="session-manage-page__name-edit">
            <BaseInput
              v-model="editedName"
              class="session-manage-page__name-input"
              @keyup.enter="saveEditName"
            />
            <BaseButton
              variant="primary"
              size="md"
              class="session-manage-page__name-save"
              @click="saveEditName"
            >
              Сохранить
            </BaseButton>
          </div>
          <div
            class="session-manage-page__status-info"
            :class="{
              'session-manage-page__status-info--active': !summary.isExpired,
              'session-manage-page__status-info--expired': summary.isExpired,
            }"
          >
            <span class="session-manage-page__status">
              {{ summary.isExpired ? 'Завершена' : 'Активна' }}
            </span>
            <IconPointFilled class="session-manage-page__dot-icon" />
            <span class="session-manage-page__count">
              {{ summary.participantCount }}
              {{ getParticipantText(summary.participantCount) }}
            </span>
          </div>
        </div>
        <BaseButton
          v-if="!summary.isExpired"
          variant="primary"
          size="md"
          class="session-manage-page__copy-button"
          @click="copyLink(sessionId)"
        >
          <IconCopyFilled />
          Ссылка
        </BaseButton>
      </div>

      <div v-if="!summary.isExpired" class="session-manage-page__qr-card">
        <QrUpload
          v-if="!summary.qrUrl"
          :session-id="sessionId"
          :qr-url="summary.qrUrl"
          @uploaded="getSummary"
        />

        <template v-else>
          <div class="session-manage-page__qr-container">
            <img
              v-if="summary.qrUrl"
              class="session-manage-page__qr-img"
              :src="summary.qrUrl"
              alt="QR"
              @click="showQrCode = true"
            />

            <label class="session-manage-page__replace-label" for="qr-upload"
              >Заменить</label
            >
          </div>

          <input
            id="qr-upload"
            type="file"
            accept="image/*"
            style="display: none"
            @change="onQrUpload"
          />
          <h2 v-if="summary.qrUrl" class="session-manage-page__total">
            {{ summary.grandTotal }} сом
          </h2>
          <p v-if="summary.qrUrl" class="session-manage-page__qr-hint">
            Покажите гостям, чтобы присоединиться
          </p>
        </template>
      </div>

      <div
        v-if="!summary.isExpired"
        class="session-manage-page__dishes-section"
      >
        <form
          class="session-manage-page__dish-form"
          @submit.prevent="editingDishId ? handleSaveEdit() : handleAddDish()"
        >
          <div class="session-manage-page__dish-fields">
            <BaseInput
              v-model="newDishName"
              placeholder="Название"
              type="text"
            />

            <BaseInput
              v-model.number="newDishPrice"
              placeholder="Цена"
              type="number"
            />

            <BaseButton
              variant="primary"
              size="md"
              class="session-manage-page__dish-submit"
              type="submit"
            >
              {{ editingDishId ? 'Сохранить' : 'Добавить' }}
            </BaseButton>
          </div>

          <div
            v-if="editingDishId"
            class="session-manage-page__dish-form-actions"
          >
            <BaseButton
              variant="secondary"
              size="md"
              type="button"
              @click="cancelEdit"
            >
              Отмена
            </BaseButton>
          </div>
        </form>

        <p v-if="dishesLoading">Загрузка блюд...</p>

        <ul v-else class="session-manage-page__dish-list">
          <li
            v-for="dish in dishes"
            :key="dish.id"
            class="session-manage-page__dish-item"
          >
            <IconBowlSpoonFilled
              class="session-manage-page__icon session-manage-page__icon--bowl"
            />
            <span class="session-manage-page__dish-name">
              <span class="session-manage-page__dish-name-text">{{
                dish.name
              }}</span>
              <span class="session-manage-page__dish-price"
                >{{ dish.price }} сом</span
              >
            </span>
            <div class="session-manage-page__dish-actions">
              <BaseButton variant="icon" size="md" @click="startEdit(dish)"
                ><IconPencilFilled
              /></BaseButton>
              <BaseButton
                variant="icon"
                size="md"
                @click="handleDeleteDish(dish.id)"
                ><IconTrashFilled
              /></BaseButton>
            </div>
          </li>
        </ul>
      </div>

      <p v-if="loading">Загрузка...</p>

      <ul v-else class="session-manage-page__list">
        <li
          v-for="participant in summary.participants"
          :key="participant.participantId"
          class="session-manage-page__item"
        >
          <div class="session-manage-page__info">
            <p class="session-manage-page__participant-name">
              {{ participant.name }}
            </p>
            <p class="session-manage-page__dishes">
              {{ participant.dishes.join(', ') || 'Ничего не выбрано' }}
            </p>
          </div>
          <p class="session-manage-page__participant-total">
            {{ participant.total }} сом
          </p>
        </li>
      </ul>

      <div v-if="!summary.isExpired" class="session-manage-page__footer">
        <BaseButton
          variant="danger"
          size="md"
          class="session-manage-page__finish-button"
          @click="showFinishModal = true"
        >
          <IconSquareRoundedFilled />
          Завершить сессию
        </BaseButton>
      </div>
    </div>

    <ConfirmModal
      v-if="showFinishModal"
      title="Завершить сессию?"
      description="Гости больше не смогут выбирать блюда"
      confirm-text="Завершить"
      cancel-text="Отмена"
      @confirm="handleFinish"
      @cancel="showFinishModal = false"
    />
  </div>
</template>

<style lang="scss">
.session-manage-page {
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;
  max-width: 36rem;
  min-height: 100dvh;
  margin: 0 auto;

  &__button--back {
    position: absolute;
    left: 1rem;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    border: 0.1rem solid var(--color-light-purple-gray);
  }

  &__content {
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  &__heading {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin: 1rem;
  }

  &__title-row {
    display: flex;
    flex-direction: column;
    gap: 0.1rem;
  }

  &__name {
    margin: 1rem 0 0 0.2rem;
    color: var(--color-dark);
    font-size: var(--font-size-md);
    font-weight: var(--font-weight-medium);
    cursor: pointer;
  }

  &__name-edit {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  &__name-save {
    margin: 0.5rem;
  }

  &__copy-button {
    margin: 0.5rem;
    padding: 0 1.2rem;
    border-radius: var(--border-radius-lg);
  }

  &__status-info {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    border-radius: var(--border-radius-md);
    font-size: var(--font-size-sm);

    &--active {
      background-color: var(--color-light-green);
      color: var(--color-green);
    }

    &--expired {
      background-color: var(--color-light-purple);
      color: var(--color-primary);
    }
  }

  &__dot-icon {
    width: 0.4rem;
    height: 0.4rem;
  }

  &__qr-card {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1.5rem 1rem;
    margin: 0 1rem;
    background-color: var(--color-white);
    border-radius: var(--border-radius-sm);
  }

  &__qr-container {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }

  &__replace-label {
    position: absolute;
    top: -0.5rem;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.7rem 1.5rem;
    max-width: 8.2rem;
    height: 3.5rem;
    margin-left: auto;
    font-weight: var(--font-weight-medium);
    color: var(--color-muted-purple);
    background-color: var(--color-secondary);
    border-radius: var(--border-radius-md);
    border: 0.1rem solid transparent;
    cursor: pointer;

    &:hover {
      border-color: var(--color-primary);
    }
  }

  &__qr-img {
    width: 100%;
    max-width: 14rem;
    margin-bottom: 1rem;
    border-radius: var(--border-radius-md);
    border: 0.1rem solid var(--color-black);
  }

  &__total {
    color: var(--color-dark);
    font-size: var(--font-size-md);
    font-weight: var(--font-weight-medium);
  }

  &__qr-hint {
    color: var(--color-muted-purple);
    font-size: var(--font-size-sm);
    margin-top: 0.25rem;
  }

  &__dishes-section {
    margin: 0 1rem 1rem;
  }

  &__dishes-title {
    margin-bottom: 0.75rem;
    color: var(--color-dark);
    font-size: var(--font-size-md);
    font-weight: var(--font-weight-medium);
  }

  &__dish-form {
    display: flex;
    flex-direction: column;
  }

  &__dish-fields {
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
    margin: 1rem 0;
  }

  &__dish-form-actions {
    display: flex;
    justify-content: flex-end;
    margin: 1rem;
    gap: 0.5rem;
  }

  &__dish-list {
    list-style: none;
    padding: 0;
    margin: 0;
    overflow: hidden;
    border-radius: var(--border-radius-sm);
    border: 0.1rem solid var(--color-secondary);
  }

  &__dish-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding: 0.75rem 1rem;
    border-bottom: 0.1rem solid var(--color-secondary);
    background-color: var(--color-white);

    &:last-child {
      border-bottom: none;
    }
  }

  &__icon {
    color: var(--color-icon);
    &--bowl {
      width: var(--icon-sm);
      height: var(--icon-sm);
    }
  }

  &__dish-name {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-width: 0;
  }

  &__dish-name-text {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: var(--color-dark);
    font-size: var(--font-size-sm);
  }

  &__dish-price {
    flex-shrink: 0;
    margin-left: 0.5rem;
    color: var(--color-muted-purple);
    font-size: var(--font-size-sm);
  }

  &__dish-actions {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    flex-shrink: 0;
  }

  &__list {
    list-style: none;
    padding: 0;
    margin: 1rem;
    overflow: hidden;
    background-color: var(--color-white);
    border-radius: var(--border-radius-sm);
  }

  &__item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding: 0.75rem 1rem;
    border-bottom: 0.1rem solid var(--color-secondary);
  }

  &__info {
    display: flex;
    flex-direction: column;
    min-width: 0;
    padding: 0.5rem;
  }

  &__participant-name {
    color: var(--color-dark);
  }

  &__dishes {
    color: var(--color-muted-purple);
    font-size: var(--font-size-sm);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__participant-total {
    flex-shrink: 0;
    color: var(--color-dark);
    font-weight: var(--font-weight-medium);
  }

  &__footer {
    background-color: var(--color-white);
    margin-top: auto;
    padding: 1rem;
  }

  &__finish-button {
    width: 100%;
    border-radius: var(--border-radius-lg);
    color: var(--color-dark-red);
    background-color: var(--color-light-pink);
  }
}
</style>
