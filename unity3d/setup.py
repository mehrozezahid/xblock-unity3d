"""Setup for unity3d XBlock."""

import os
from setuptools import setup


def package_data(pkg, roots):
    """Generic function to find package_data.

    All of the files under each of the `roots` will be declared as package
    data for package `pkg`.

    """
    data = []
    for root in roots:
        for dirname, _, files in os.walk(os.path.join(pkg, root)):
            for fname in files:
                data.append(os.path.relpath(os.path.join(dirname, fname), pkg))

    return {pkg: data}


setup(
    name='unity3d-xblock',
    version='0.1',
    description='unity3d XBlock',   # TODO: write a better description.
    packages=[
        'unity3d',
    ],
    install_requires=[
        'XBlock',
    ],
    entry_points={
        'xblock.v1': [
            'unity3d = unity3d:Unity3dXBlock',
        ]
    },
    package_data=package_data("unity3d", ["static", "public"]),
)
