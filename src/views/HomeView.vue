<script setup>
import { onMounted, ref, watchEffect } from 'vue'
import { useTimerStore } from '../stores/timer'
import ModalSetting from '../components/ModalSetting.vue'
import ProjectsMain from './Home/Projects/ProjectsMain.vue'
import TasksMain from './Home/Tasks/TasksMain.vue'
import { useDatabaseStore } from '../stores/database'
const { tasks, taskActive } = useDatabaseStore()

const timerStore = useTimerStore()
const pomodoroCount = ref(1)
const notifEnabled = ref(false)

onMounted(() => {
  timerStore.setPomodoro()
  if ('Notification' in window && Notification.permission !== 'granted') {
    Notification.requestPermission()
    notifEnabled.value = true
  }
})
const resetPomodoro = () => {
  alert('Apakah kamu yakin ingin mereset pomodoro?')
  timerStore.sessionCount = 0
}


const createNotification = () => {
  if ('Notification' in window && Notification.permission === 'granted') {
    new Notification('Timer selesai!', {
      body: 'Waktu telah habis.'
    })
  }
}

const nextSession = () => {
  timerStore.sessionCount++
  let current = timerStore.sessions.latest()
  timerStore.setCompleted(current.id)
  if (current.sessionType === 1) {
    getAllPomodoroAfterLongBreak(timerStore.sessions).length === 4
      ? timerStore.setLongBreak()
      : timerStore.setShortBreak()
    if(taskActive.id !== null) {
      let task = tasks.find((task) => task.id === taskActive.id)
      task.count++
    }
  } else {
    timerStore.setPomodoro()
  }
  if (current.sessionType === 1) pomodoroCount.value++
}

function getAllPomodoroAfterLongBreak(array) {
  const sessions = []
  let isFound = false

  for (let i = array.length - 1; i >= 0; i--) {
    const currentSession = array[i]

    if (currentSession.sessionType === 3 && currentSession.isCompleted) {
      isFound = true
      continue
    }

    if (currentSession.sessionType === 1 && currentSession.isCompleted) {
      sessions.push(currentSession)
    }
    if (isFound) break
  }

  return sessions
}

watchEffect(() => {
  if (timerStore.isRunning && timerStore.timer === 0) {
    createNotification()
    nextSession()
  }
})
</script>

<template>
  <div class="bg-emerald-700 container">
    <nav>
      <div class="mx-auto max-w-2xl p-3 flex flex-row justify-between border-b border-emerald-900">
        <h1 class="text-lg font-bold text-emerald-50">PomoVue</h1>
        <ModalSetting />
      </div>
    </nav>

    <div class="bg-emerald-600 w-full p-3 rounded-md mt-6" v-if="notifEnabled">
      Please enable notification by reload the page if you want being notified when timers end.
    </div>

    <div class="content mx-auto gap-2.5 py-8 text-emerald-50 flex md:flex-row flex-col w-full">
      <ProjectsMain />
      <TasksMain />
      <div class="grid gap-6 w-max">
        <div class="bg-emerald-600 px-4 py-6 md:px-16 rounded flex flex-col">
          <div class="card-nav flex flex-row gap-3 justify-center">
            <button
              class="px-2 md:px-3 py-1 rounded"
              :class="{ 'font-semibold bg-emerald-700': timerStore.currentSession === 1 }"
              @click="timerStore.setPomodoro"
            >
              Pomodoro
            </button>
            <button
              class="px-2 md:px-3 py-1 rounded"
              :class="{ 'font-semibold bg-emerald-700': timerStore.currentSession === 2 }"
              @click="timerStore.setShortBreak"
            >
              Short Break
            </button>
            <button
              class="px-2 md:px-3 py-1 rounded"
              :class="{ 'font-semibold bg-emerald-700': timerStore.currentSession === 3 }"
              @click="timerStore.setLongBreak"
            >
              Long Break
            </button>
          </div>
          <div class="timer text-center">
            <span class="text-[120px] font-bold"> {{ timerStore.timerInMinutes }} </span>
          </div>
          <div class="text-center relative">
            <button
              class="text-2xl font-semibold text-emerald-500 bg-white w-44 md:w-52 py-4 rounded shadow-noblur uppercase transition-all"
              @click="timerStore.startTimer"
              :class="{ 'shadow-none translate-y-1.5': timerStore.isRunning === true }"
            >
              {{ timerStore.isRunning === true ? 'Pause' : 'Start' }}
            </button>
            <button
              class="absolute right-0 top-1/2 -translate-y-1/2 text-2xl font-semibold rounded hover:opacity-75"
              v-if="timerStore.isRunning === true"
              @click="nextSession()"
            >
              <span class="material-icons font-bold !text-4xl">skip_next</span>
            </button>
          </div>
        </div>
        <div class="text-center mb-5">
          <h2 class="hover:cursor-pointer hover:opacity-70" @click="resetPomodoro()">
            #{{ timerStore.currentSession == 1 ? pomodoroCount : pomodoroCount - 1 }}
          </h2>
          <h4>
            {{ timerStore.currentSession == 1 ? 'Time To Focus' : "Let's Take a Break" }}
          </h4>
        </div>
      </div>
    </div>
    <div class="my-4">
      <div class="text-center">time you focused today : {{ timerStore.timeFocus }} minutes</div>
    </div>
  </div>
</template>
