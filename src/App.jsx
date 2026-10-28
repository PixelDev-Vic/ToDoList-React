import { useEffect, useRef, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import AppShell from './components/AppShell.jsx'
import DeleteGroupDialog from './components/DeleteGroupDialog.jsx'
import { createId } from './data/createId.js'
import DashboardPage from './pages/DashboardPage.jsx'
import DevelopersPage from './pages/DevelopersPage.jsx'
import GroupTasksPage from './pages/GroupTasksPage.jsx'
import GroupsPage from './pages/GroupsPage.jsx'
import GuidePage from './pages/GuidePage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'

const APP_STORAGE_KEY = 'daybook.workspace.v1'

function readSavedWorkspace() {
  try {
    const savedWorkspace = JSON.parse(window.localStorage.getItem(APP_STORAGE_KEY) ?? 'null')
    if (Array.isArray(savedWorkspace?.groups) && Array.isArray(savedWorkspace?.tasks)) {
      return savedWorkspace
    }
  } catch {
    // Keep the app usable when browser storage is unavailable or invalid.
  }

  return { groups: [], tasks: [] }
}

export default function App() {
  return (
    <BrowserRouter>
      <DaybookApp />
    </BrowserRouter>
  )
}

function DaybookApp() {
  const [initialWorkspace] = useState(readSavedWorkspace)
  const [groups, setGroups] = useState(initialWorkspace.groups)
  const [tasks, setTasks] = useState(initialWorkspace.tasks)
  const [undoEntry, setUndoEntry] = useState(null)
  const [groupPendingDelete, setGroupPendingDelete] = useState(null)
  const undoTimer = useRef(null)
  const navigate = useNavigate()

  function clearUndo() {
    if (undoTimer.current) {
      window.clearTimeout(undoTimer.current)
      undoTimer.current = null
    }
    setUndoEntry(null)
  }

  function showUndo(entry) {
    if (undoTimer.current) window.clearTimeout(undoTimer.current)
    setUndoEntry(entry)
    undoTimer.current = window.setTimeout(() => {
      setUndoEntry(null)
      undoTimer.current = null
    }, 6500)
  }

  useEffect(() => () => {
    if (undoTimer.current) window.clearTimeout(undoTimer.current)
  }, [])

  useEffect(() => {
    try {
      window.localStorage.setItem(APP_STORAGE_KEY, JSON.stringify({ groups, tasks }))
    } catch {
      // State remains available for the current session if storage is full or blocked.
    }
  }, [groups, tasks])

  function handleAddGroup(name) {
    const normalizedName = name.trim().toLocaleLowerCase()
    const alreadyExists = groups.some((group) => group.name.trim().toLocaleLowerCase() === normalizedName)

    if (alreadyExists) {
      return { error: 'A group with that name already exists.' }
    }

    clearUndo()
    setGroups((currentGroups) => [...currentGroups, { id: createId(), name: name.trim() }])
    return { error: '' }
  }

  function handleAddTask(groupId, title, description = '') {
    clearUndo()
    setTasks((currentTasks) => [
      ...currentTasks,
      { id: createId(), title: title.trim(), groupId, completed: false, description: description.trim(), time: '' },
    ])
  }

  function handleUpdateTaskDetails(taskId, updates) {
    if (undoEntry) clearUndo()
    setTasks((currentTasks) => currentTasks.map((task) => (
      task.id === taskId ? { ...task, ...updates } : task
    )))
  }

  function handleToggleTask(taskId) {
    clearUndo()
    setTasks((currentTasks) => currentTasks.map((task) => (
      task.id === taskId ? { ...task, completed: !task.completed } : task
    )))
  }

  function handleDeleteTask(taskId) {
    const taskIndex = tasks.findIndex((task) => task.id === taskId)
    if (taskIndex === -1) return

    const deletedTask = tasks[taskIndex]
    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== taskId))
    showUndo({ kind: 'task', task: deletedTask, index: taskIndex })
  }

  function handleRequestDeleteGroup(group) {
    setGroupPendingDelete(group)
  }

  function handleConfirmDeleteGroup() {
    if (!groupPendingDelete) return

    const deletedGroup = groupPendingDelete
    const groupIndex = groups.findIndex((group) => group.id === deletedGroup.id)
    if (groupIndex === -1) {
      setGroupPendingDelete(null)
      return
    }
    const groupTaskCount = tasks.filter((task) => task.groupId === deletedGroup.id).length

    setGroups((currentGroups) => currentGroups.filter((group) => group.id !== deletedGroup.id))
    setTasks((currentTasks) => currentTasks.filter((task) => task.groupId !== deletedGroup.id))
    setGroupPendingDelete(null)
    navigate('/groups')
    showUndo({ kind: 'group', group: deletedGroup, groupTaskCount, groupsBefore: groups, tasksBefore: tasks })
  }

  function handleUndoDelete() {
    if (!undoEntry) return
    if (undoTimer.current) window.clearTimeout(undoTimer.current)

    if (undoEntry.kind === 'task') {
      setTasks((currentTasks) => {
        if (currentTasks.some((task) => task.id === undoEntry.task.id)) return currentTasks
        const restoredTasks = [...currentTasks]
        restoredTasks.splice(Math.min(undoEntry.index, restoredTasks.length), 0, undoEntry.task)
        return restoredTasks
      })
    } else if (undoEntry.kind === 'group') {
      setGroups(undoEntry.groupsBefore)
      setTasks(undoEntry.tasksBefore)
    }

    setUndoEntry(null)
    undoTimer.current = null
  }

  function handleDismissUndo() {
    if (undoTimer.current) window.clearTimeout(undoTimer.current)
    setUndoEntry(null)
    undoTimer.current = null
  }

  const deletedGroupTaskCount = groupPendingDelete
    ? tasks.filter((task) => task.groupId === groupPendingDelete.id).length
    : 0

  return (
    <>
      <Routes>
        <Route element={<AppShell undoEntry={undoEntry} onUndo={handleUndoDelete} onDismissUndo={handleDismissUndo} />}>
          <Route index element={<Navigate to="/home" replace />} />
          <Route path="home" element={<DashboardPage tasks={tasks} groups={groups} onAddTask={handleAddTask} onToggleTask={handleToggleTask} onDeleteTask={handleDeleteTask} onUpdateTaskDetails={handleUpdateTaskDetails} />} />
          <Route path="groups" element={<GroupsPage groups={groups} tasks={tasks} onAddGroup={handleAddGroup} onRequestDeleteGroup={handleRequestDeleteGroup} />} />
          <Route path="groups/:groupId" element={<GroupTasksPage groups={groups} tasks={tasks} onAddTask={handleAddTask} onToggleTask={handleToggleTask} onDeleteTask={handleDeleteTask} onUpdateTaskDetails={handleUpdateTaskDetails} onRequestDeleteGroup={handleRequestDeleteGroup} />} />
          <Route path="guide" element={<GuidePage />} />
          <Route path="developers" element={<DevelopersPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>

      {groupPendingDelete && (
        <DeleteGroupDialog
          group={groupPendingDelete}
          taskCount={deletedGroupTaskCount}
          onCancel={() => setGroupPendingDelete(null)}
          onConfirm={handleConfirmDeleteGroup}
        />
      )}
    </>
  )
}
