import { useState } from 'react';
import DangerButton from '@/Components/DangerButton';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import { router } from '@inertiajs/react';

export default function DeleteProjectForm({ project }) {
    const [confirmingProjectDeletion, setConfirmingProjectDeletion] = useState(false);

    const confirmProjectDeletion = () => {
        setConfirmingProjectDeletion(true);
    };

    const deleteProject = (e) => {
        e.preventDefault();

        router.delete(route('project.destroy', project.id));
    };

    const closeModal = () => {
        setConfirmingProjectDeletion(false);
    };

    return (
        <div>
            <button
                onClick={confirmProjectDeletion}
                className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1"
            >
                Delete
            </button>

            <Modal show={confirmingProjectDeletion} onClose={closeModal}>
                <form onSubmit={deleteProject} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                        Are you sure you want to delete the "{project.name}" project?
                    </h2>

                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        Deleting a project will also delete any assigned tasks to the project
                    </p>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>

                        <DangerButton className="ms-3">
                            Delete Project
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
