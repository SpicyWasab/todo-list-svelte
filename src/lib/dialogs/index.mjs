import CreateListDialog from './CreateListDialog.svelte';
import CreateTaskDialog from './CreateTaskDialog.svelte';
import RenameListDialog from './RenameListDialog.svelte';
import DeleteListDialog from './DeleteListDialog.svelte';
import ArchiveListDialog from './ArchiveListDialog.svelte';
import UnarchiveListDialog from './UnarchiveListDialog.svelte';
import MoveListDialog from './MoveListDialog.svelte';
import CreateCategoryDialog from './CreateCategoryDialog.svelte';
import DeleteCategoryDialog from './DeleteCategoryDialog.svelte';

export default {
    'create-list': CreateListDialog,
    'create-task': CreateTaskDialog,
    'rename-list': RenameListDialog,
    'delete-list': DeleteListDialog,
    'archive-list': ArchiveListDialog,
    'unarchive-list': UnarchiveListDialog,
    'move-list': MoveListDialog,
    'create-category': CreateCategoryDialog,
    'delete-category': DeleteCategoryDialog
}