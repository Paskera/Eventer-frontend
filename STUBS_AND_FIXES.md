# Найденные заглушки и необходимые исправления

## ✅ ИСПРАВЛЕНО

Все критические заглушки были исправлены. См. раздел "Статус исправлений" ниже.

---

## 🔴 Критические заглушки (требуют немедленного исправления)

### 1. Обновление статуса события
**Файл:** `app/(protected)/events/dashboard/[id]/page.tsx`  
**Строка:** 199-209  
**Проблема:** Используется `Promise.resolve` вместо реального API вызова

```typescript
// ❌ Текущий код (заглушка)
const updateEventStatusMutation = useMutation({
  mutationFn: ({ eventId, status }: { eventId: number; status: string }) => {
    return Promise.resolve({ id: eventId, event_status: status });
  },
});
```

**Исправление:** Использовать `PATCH /api/events/{id}/`
```typescript
// ✅ Правильный код
const updateEventStatusMutation = useMutation({
  mutationFn: ({ eventId, status }: { eventId: number; status: string }) => {
    return apiEvents.updateEvent(eventId, { event_status: status });
  },
});
```

**Нужно добавить в `apiEvents`:**
```typescript
updateEvent: async (id: number, data: Partial<Event>): Promise<Event> => {
  return (await restAxios.patch(`api/events/${id}`, data)).data;
},
```

---

### 2. Обновление статуса команды
**Файл:** `app/(protected)/events/dashboard/[id]/page.tsx`  
**Строка:** 259-283  
**Проблема:** Только `console.log`, нет реального API вызова

```typescript
// ❌ Текущий код (заглушка)
const confirmAction = async () => {
  if (approvalAction === "approve") {
    console.log(`Approving team ${teamToModify}`);
  } else if (approvalAction === "reject") {
    console.log(`Rejecting team ${teamToModify}`);
  }
};
```

**Исправление:** Использовать `POST /api/events/{event_id}/event-teams/{team_id}/update-status`
```typescript
// ✅ Правильный код
const confirmAction = async () => {
  if (teamToModify && approvalAction) {
    try {
      await apiEventTeams.updateTeamStatus(eventId, teamToModify, approvalAction);
      queryClient.invalidateQueries({ queryKey: ["eventTeams", eventId] });
      setIsApprovalModalOpen(false);
      setTeamToModify(null);
      setApprovalAction(null);
    } catch (error) {
      console.error("Error updating team status:", error);
    }
  }
};
```

**Нужно добавить в `apiEventTeams`:**
```typescript
updateTeamStatus: async (event_id: number, team_id: number, status: 'approved' | 'rejected'): Promise<void> => {
  await restAxios.post(`/api/events/${event_id}/event-teams/${team_id}/update-status`, { status });
},
```

---

### 3. Сохранение этапа
**Файл:** `app/(protected)/events/dashboard/[id]/page.tsx`  
**Строка:** 302-308  
**Проблема:** Только `console.log`, нет реального API вызова

```typescript
// ❌ Текущий код (заглушка)
const saveStage = async (stageData: any) => {
  console.log('Saving stage:', stageData);
  queryClient.invalidateQueries({ queryKey: ["eventStages", eventId] });
  closeStageModal();
};
```

**Исправление:** Использовать `PATCH /api/events/{event_id}/stages/{id}/` или `POST /api/events/{event_id}/stages/`
```typescript
// ✅ Правильный код
const saveStage = async (stageData: any) => {
  try {
    if (editingStage?.id) {
      await apiStages.updateStage(eventId, editingStage.id, stageData);
    } else {
      await apiStages.createStage(eventId, stageData);
    }
    queryClient.invalidateQueries({ queryKey: ["eventStages", eventId] });
    closeStageModal();
  } catch (error) {
    console.error('Error saving stage:', error);
  }
};
```

**Нужно добавить в `apiStages`:**
```typescript
createStage: async (event_id: number, data: any): Promise<Stages> => {
  return (await restAxios.post(`/api/events/${event_id}/stages/`, data)).data;
},
updateStage: async (event_id: number, stage_id: number, data: any): Promise<Stages> => {
  return (await restAxios.patch(`/api/events/${event_id}/stages/${stage_id}/`, data)).data;
},
```

---

### 4. Сохранение настроек события
**Файл:** `app/(protected)/events/dashboard/[id]/page.tsx`  
**Строка:** 333-339  
**Проблема:** Только `console.log`, нет реального API вызова

```typescript
// ❌ Текущий код (заглушка)
const saveEventSettings = async (updatedEvent: any) => {
  console.log('Saving event settings:', updatedEvent);
  queryClient.invalidateQueries({ queryKey: ["event", eventId] });
  closeEventSettingsModal();
};
```

**Исправление:** Использовать `PATCH /api/events/{id}/`
```typescript
// ✅ Правильный код
const saveEventSettings = async (updatedEvent: any) => {
  try {
    await apiEvents.updateEvent(eventId, updatedEvent);
    queryClient.invalidateQueries({ queryKey: ["event", eventId] });
    closeEventSettingsModal();
  } catch (error) {
    console.error('Error saving event settings:', error);
  }
};
```

---

### 5. Архивирование события
**Файл:** `app/(protected)/events/dashboard/[id]/page.tsx`  
**Строка:** 349-354  
**Проблема:** Только `console.log`, нет реального API вызова

```typescript
// ❌ Текущий код (заглушка)
const confirmArchiveEvent = async () => {
  console.log('Archiving event');
  queryClient.invalidateQueries({ queryKey: ["event", eventId] });
  closeArchiveModal();
};
```

**Исправление:** Использовать `PATCH /api/events/{id}/` с изменением статуса на "archived" или `DELETE /api/events/{id}/`
```typescript
// ✅ Правильный код
const confirmArchiveEvent = async () => {
  try {
    await apiEvents.updateEvent(eventId, { event_status: 'archived' });
    // или если нужен DELETE:
    // await apiEvents.deleteEvent(eventId);
    queryClient.invalidateQueries({ queryKey: ["event", eventId] });
    closeArchiveModal();
  } catch (error) {
    console.error('Error archiving event:', error);
  }
};
```

**Нужно добавить в `apiEvents`:**
```typescript
deleteEvent: async (id: number): Promise<void> => {
  await restAxios.delete(`api/events/${id}`);
},
```

---

### 6. Mock данные команд в EventTeamsPage
**Файл:** `app/(protected)/events/dashboard/components/EventTeamsPage.tsx`  
**Строка:** 43-291, 365, 413  
**Проблема:** Используются `mockTeams` вместо реальных данных из API

```typescript
// ❌ Текущий код (заглушка)
const mockTeams = [/* большой массив моковых данных */];
const filteredTeams = mockTeams.filter((team) => { /* ... */ });
```

**Исправление:** Использовать `GET /api/events/{event_id}/event-teams/`
```typescript
// ✅ Правильный код
const { data: teamsData, isLoading } = useQuery({
  queryKey: ['eventTeams', eventId],
  queryFn: () => apiEventTeams.getEventTeams(eventId),
});

const teams = teamsData?.teams || [];
const filteredTeams = teams.filter((team) => {
  const matchesStatus = statusFilter === "all" || team.status === statusFilter;
  const matchesSearch = team.name.toLowerCase().includes(searchQuery.toLowerCase());
  return matchesStatus && matchesSearch;
});
```

---

### 7. Получение событий организатора
**Файл:** `app/(protected)/dashboard/page.tsx`  
**Строка:** 60-77  
**Проблема:** Используется `getAllEvents()` вместо API для событий организатора

```typescript
// ❌ Текущий код (заглушка)
const { data, isLoading, error } = useQuery({
  queryKey: ['organizerEvents'],
  queryFn: async () => {
    // Временно используем все события, пока не реализуем API
    const allEvents = await apiEvents.getAllEvents()
    return allEvents.events
  },
});
```

**Исправление:** Использовать `GET /api/events/my/created/`
```typescript
// ✅ Правильный код
const { data, isLoading, error } = useQuery({
  queryKey: ['organizerEvents'],
  queryFn: async () => {
    return await apiEvents.getMyCreatedEvents();
  },
});
```

**Нужно добавить в `apiEvents`:**
```typescript
getMyCreatedEvents: async (params?: {
  page?: number;
  page_size?: number;
}): Promise<EventsResponse> => {
  return (await restAxios.get(`api/events/my/created/`, { params })).data;
},
```

---

## 📊 Статус исправлений

| # | Проблема | Статус | Дата |
|---|----------|--------|------|
| 1 | Обновление статуса события | ✅ Исправлено | 2024-01-XX |
| 2 | Обновление статуса команды | ✅ Исправлено | 2024-01-XX |
| 3 | Сохранение этапа | ✅ Исправлено | 2024-01-XX |
| 4 | Сохранение настроек события | ✅ Исправлено | 2024-01-XX |
| 5 | Архивирование события | ✅ Исправлено | 2024-01-XX |
| 6 | Mock данные команд в EventTeamsPage | ✅ Исправлено | 2024-01-XX |
| 7 | Получение событий организатора | ✅ Исправлено | 2024-01-XX |
| 8 | Действия с командами в EventTeamsPage | ✅ Частично исправлено | 2024-01-XX |

---

## 🟡 Средние заглушки (требуют внимания)

### 8. Действия с командами в EventTeamsPage
**Файл:** `app/(protected)/events/dashboard/components/EventTeamsPage.tsx`  
**Строка:** 353-363  
**Проблема:** Только `console.log` для действий с командами

```typescript
// ❌ Текущий код (заглушка)
const handleTeamAction = (teamId, action) => {
  console.log(`${action} team ${teamId}`)
}
```

**Исправление:** Реализовать реальные API вызовы:
- Для одобрения/отклонения: `POST /api/events/{event_id}/event-teams/{team_id}/update-status`
- Для удаления: `DELETE /api/events/{event_id}/event-teams/{id}`

---

### 9. Отправка уведомлений
**Файл:** `app/(protected)/events/dashboard/[id]/page.tsx`  
**Строка:** 318-323  
**Проблема:** Заглушка, но API для уведомлений не указан в списке endpoints

**Примечание:** Нужно уточнить у бэкенда, есть ли API для отправки уведомлений или это функционал планируется.

---

## 🟢 Низкий приоритет (могут быть для тестирования)

### 10. Mock данные в teams/data.ts
**Файл:** `app/(protected)/teams/data.ts`  
**Проблема:** Mock данные для страницы команд

**Примечание:** Если страница `/teams` не связана с событиями и используется для другой цели, это может быть нормально. Но если это часть системы событий, нужно использовать реальные API.

---

### 11. Mock функция в team-members-list.tsx
**Файл:** `app/(protected)/teams/components/team-members-list.tsx`  
**Строка:** 21-30  
**Проблема:** `mockUserById` функция

**Примечание:** Проверить, используется ли эта функция в продакшене или только для разработки.

---

## 📋 Сводная таблица необходимых API методов

| Метод | Endpoint | Файл для добавления | Статус |
|-------|----------|---------------------|--------|
| `updateEvent` | `PATCH /api/events/{id}/` | `api/http/event/events.ts` | ❌ Отсутствует |
| `deleteEvent` | `DELETE /api/events/{id}/` | `api/http/event/events.ts` | ❌ Отсутствует |
| `getMyCreatedEvents` | `GET /api/events/my/created/` | `api/http/event/events.ts` | ❌ Отсутствует |
| `updateTeamStatus` | `POST /api/events/{event_id}/event-teams/{team_id}/update-status` | `api/http/EventTeams/event_teams.ts` | ❌ Отсутствует |
| `createStage` | `POST /api/events/{event_id}/stages/` | `api/http/stages/stages.ts` | ❌ Отсутствует |
| `updateStage` | `PATCH /api/events/{event_id}/stages/{id}/` | `api/http/stages/stages.ts` | ❌ Отсутствует |
| `deleteStage` | `DELETE /api/events/{event_id}/stages/{id}/` | `api/http/stages/stages.ts` | ❌ Отсутствует |

---

## ✅ Рекомендации по исправлению

1. **Приоритет 1 (критично):**
   - Обновление статуса события
   - Обновление статуса команды
   - Сохранение этапа
   - Сохранение настроек события
   - Архивирование события
   - Замена mockTeams на реальные данные

2. **Приоритет 2 (важно):**
   - Получение событий организатора
   - Действия с командами в EventTeamsPage

3. **Приоритет 3 (желательно):**
   - Проверить использование mock данных в teams/
   - Уточнить API для уведомлений

---

## 🔍 Дополнительные проверки

Рекомендуется также проверить:
- Использование `console.log` вместо реальных действий
- Комментарии типа "TODO", "FIXME", "Временно"
- Любые другие места, где данные не загружаются с бэкенда
