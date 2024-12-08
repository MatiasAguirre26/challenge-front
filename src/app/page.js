"use client";

import Image from "next/image";
import Header from "@/components/header";
import Subheader from "@/components/subheader";
import ActionMenu from "@/components/action-menu";
import useProjectStore from '@/stores/projectStore';

export default function Home() {
  const projects = useProjectStore((state) => state.projects);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <Subheader title="My projects" showAddProjectButton={true} showBackButton={false} />

      <main className="p-0 lg:p-6">
        {/* Vista responsive */}
        <div className="flex-col hidden text-black bg-white rounded-lg shadow-md md:flex">
          <div className="flex font-bold bg-gray-200">
            <div className="w-1/4 px-4 py-2">Project Info</div>
            <div className="w-1/4 px-4 py-2">Project Manager</div>
            <div className="w-1/4 px-4 py-2">Assigned to</div>
            <div className="w-1/6 px-4 py-2">Status</div>
            <div className="w-1/6 px-4 py-2 text-center">Action</div>
          </div>

          {projects.map((project) => (
            <div className="flex items-center border-t" key={project.id}>
              <div className="w-1/4 px-4 py-4">
                <p className="text-gray-800">{project.name}</p>
                <p className="text-sm text-gray-400">
                  Creation date: {project.createdAt}
                </p>
              </div>

              <div className="w-1/4 px-4 py-4">
                <div className="flex items-center">
                  <span className="flex items-center justify-center w-8 h-8 mr-4 font-bold text-orange-700 bg-orange-200 rounded-full">
                    WC
                  </span>
                  <span>{project.projectManager}</span>
                </div>
              </div>

              <div className="w-1/4 px-4 py-4">
                <div className="flex items-center">
                  <span className="w-8 h-8 mr-4 overflow-hidden bg-gray-200 rounded-full">
                    <Image 
                      src="/assets/assigned_user.jpg" 
                      alt="Assigned user" 
                      width={80}  
                      height={80} 
                      className="rounded-full"
                    />
                  </span>
                  <span>{project.assignedTo}</span>
                </div>
              </div>

              <div className="w-1/6 px-4 py-4">
                <span className="px-2 py-1 text-gray-700 bg-gray-200 border-2 border-gray-300 rounded-lg">{project.status}</span>
              </div>

              <div className="flex justify-center w-1/6 px-4 py-4 text-center">
                <ActionMenu projectId={project.id}/>
              </div>
            </div>
          ))}
        </div>

        {/* Vista para pantallas pequeñas */}
        <div className="block md:hidden p-none">
          <div className="text-black bg-white rounded-lg shadow-md">
            {projects.map((project) => (
              <div key={project.id} className="p-4 border-b last:border-b-0">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-800">{project.name}</p>
                    <p className="text-sm text-gray-400">
                      Creation date: {project.createdAt}
                    </p>
                  </div>
                  <ActionMenu projectId={project.id}/>
                </div>
                <div className="flex justify-between mt-4">
                  <div className="flex items-center space-x-2">
                    <span className="w-8 h-8 overflow-hidden bg-gray-200 rounded-full">
                      <Image 
                        src="/assets/assigned_user.jpg" 
                        alt="Assigned user" 
                        width={62}  
                        height={62} 
                        className="rounded-full"
                      />
                    </span>
                    <span>{project.assignedTo || 'Usuario desconocido'}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </main>
    </div>
  );
}
